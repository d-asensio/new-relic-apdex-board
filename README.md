# New Relic Apdex Board - Code challenge

This document attempts to explain the big picture of the code and the architecture it follows, and also give insight about the intentions behind it. Thank you for taking the time to read and review.

## Set up the project

First things first! Before explaining anything else, here is a handy command to initialize the project:

```bash
yarn ; yarn dev
```

This will serve the dashboard in development mode to the port `:8080`.

Of course, there are more commands available, I will describe them shortly at the [commands section](#commands).

## Acceptance criteria

I have put together the acceptance criteria that are defined in the code challenge description:

- [x] **Models the described problem with a suitable class hierarchy:** The problem has been modeled using the MVCS (Model View Controller Service) design pattern, I did my best to create a suitable class hierarchy.

- [x] **Implements the “getTopAppsByHost” method that, given a hostname, retrieves a list of the 25 most satisfying applications:** This method is placed into the dashboard service since there is where the data of the dashboard is managed.

- [x] **Implements the “addAppToHosts” and “removeAppFromHosts” methods:** Those two are also placed into the service.

- [x] **Each card representing a host must display its top 5 apps ordered by satisfaction.**

- [x] **As shown in the mockups, there are two types of layouts (grid and list) and when clicking on the checkbox the layout changes.**

- [x] **When clicking over an app, an alert dialog including the release number has to be shown.**

- [x] **Browser support: IE11+, latest 2 versions of Chrome, Firefox, Safari, Opera:** I have to mention that I use the fetch API that is not natively supported by IE11, there are polyfills available, but I didn't set up any because I didn't want to explicitly add any external dependency (except for development). Apart from that everything else should work just fine in IE11 since I use **babel** with **core-js@3** (which polyfills Promises, Map, and everything else I use). I didn't test it properly though since I have a mac.

- [x] **Each application list is always ordered by Apdex.**

- [x] **Do not use frameworks/libraries:** I don't use any dependency apart from the tooling used to transpile, bundle and test the code, there is a list of the used tools at the [tooling section](#tooling).

> You'll see that I do use JSX to render the views, but this is because I have written a custom jsx-runtime for the purpose. I use `@babel/plugin-transform-react-jsx` to transpile it, but with a custom `pragma` that delegates the processing to the runtime that I have created. You can find the runtime at `src/jsx-runtime.js`.

- [x] **Maintainable and well-written code using good object-oriented practices:** I have tried so hard to do it. I followed the SOLID principles and some bits of advice I got from books (Clean Code, GOF Design patterns, and others). I hope you find the code enjoyable to read and easy to follow.

- [x] **Specify Big-O notation of your algorithm:** Yes, there is a [section of this document](#algorithm-complexity) 

- [x] **Not a database or any data source connection:** I didn't use any database or similar. It's true that I make a request to get the JSON data, but I don't use any API Service, just `copy-webpack-plugin` and `webpack-dev-server`, since I wanted to avoid bundling the data along with the code.

- [x] **Not using 3rd party libraries such as JS or CSS libraries:** No, as I mentioned before I don't use any library. It is fair to mention that I started by using `normalize.css`, but I finally hand-picked the relevant rules to the project and created a custom CSS reset layer. You can check [the commit](https://github.com/d-asensio/new-relic-apdex-board/commit/19d098cb2b2dc0871e5ab15021d549fee24b04a6).

## Code Comments

You won't find many comments on the code, there are some *quick explanations* about the responsibilities of some parts of the code, but not in very in-depth. There are also some *clarifications* about code in this document, especially at the [algorithm complexity section](#algorithm-complexity).

In general, I prefer to put my efforts on writing clean code more than in explaining what is the intention of an intricate code.

## Test-Driven Development

I have followed TDD during the development process of this project, you can gossip the git log, and you'll find every change paired with its test and every fixed bug with a test that covers it.

## Commit guidelines

I didn't use any strict commit guidelines to this project, I am aware of conventional commits, semantic release, and semantic versioning, but since I didn't have the need for generating a changelog based on functionalities, I avoided this practices.

## Commands

Here is the list of commands that are supported:

- `dev`: Starts the development server at the port `:8080`.
- `build`: Creates a build artifact to the `build/` folder.
- `lint`: Uses `standardjs` (with some custom modifications) to check the code style.
- `lint:fix`: Attempts to fix the code style.
- `test`: Runs all the tests once.
- `test:watch`: Watches file changes and run the related tests.

## Algorithm Complexity

Of course, I am not going to describe the complexity of all the code, I think that the relevant parts are:

### Creation of the data structure at the first load (dashboard service)

Following the advice given at the code challenge, I read the JSON at once, and the first thing I do is sorting the app records I get based on a criterion that is defined by the `Application` model.

```javascript
  _sortAppRecordsByApdex (appRecords) {
    return appRecords.sort(Application.byApdexInDescOrder)
  }
```
> Find this method at: `src/services/dashboard.service.js`

The complexity of this part is hard to determine since it depends on the implementation of the JavaScript engine that is running the code. In case of `V8` it uses the [`std::sort` C++ 11 function](https://github.com/v8/v8/blob/4b9b23521e6fd42373ebbcb20ebe03bf445494f9/src/runtime/runtime-typedarray.cc#L135) that is supposed to be `O(n log n)`.

### Inserting the apps into each host in sorted order.

After this, the records are inserted into the hosts via `host.addApp(app)`:

```javascript
  _insertAppInPosition (app) {
    const appInsertionIndex = this._binarySearch(app)
    this._insertAppAtIndex(app, appInsertionIndex)
  }
```
> Find this method at: `src/models/host.model.js`

As you can see, it uses a binary search to perform the insertion:

```javascript
  _binarySearch (app) {
    let startIndex = 0
    let endIndex = this._apps.length - 1
    let currentIndex

    while (startIndex <= endIndex) {
      currentIndex = (startIndex + endIndex) / 2 | 0
      const iteratingApp = this._apps[currentIndex]

      if (app.compareTo(iteratingApp) < 0) {
        startIndex = currentIndex + 1
      } else if (app.compareTo(iteratingApp) > 0) {
        endIndex = currentIndex - 1
      } else {
        return currentIndex
      }
    }

    return Math.abs(~endIndex)
  }
```
> Find this method at: `src/models/host.model.js`

So it is discarding the half of the possibilities on each iteration of the `while` loop, so `O(log n)`.

A nice optimization is that as an effect of sorting the app records right before inserting them to the host, it happens that the real cost is `O(1)` at this point (for the insertion operation of each new app I mean) since the binary search do not iterate through any record being the smallest app already at the end of the `host._apps` array.

This way all the heavy work is handled by the performant [`std::sort` C++ 11 function](https://github.com/v8/v8/blob/4b9b23521e6fd42373ebbcb20ebe03bf445494f9/src/runtime/runtime-typedarray.cc#L135) I aforementioned which is unbeatable by any sorting algorithm that one could implement in javascript (I believe).

### Deleting an app from the host

Again `O(log n)` since it also uses the binary search. Same argumentation.

```javascript
  _removeAppFromPosition (app) {
    const appIndex = this._binarySearch(app)

    this._indexExistOrThrow(appIndex)
    this._removeAppAtIndex(appIndex)
  }
```
> Find this method at: `src/models/host.model.js`

What enables using the same binary search function for both insertion and deletion of an app is the implementation of the `app.compareTo(app)` method:

```javascript
  compareTo (comparee) {
    const comparison = this.apdex - comparee.apdex

    if (comparison === 0) {
      return this._comparisonTiebreakerByIdentifier(comparee)
    }

    return comparison
  }

  _comparisonTiebreakerByIdentifier (comparee) {
    if (this.id > comparee.id) return 1
    if (this.id < comparee.id) return -1

    return 0
  }
```

As you might notice, it has a `_comparisonTiebreakerByIdentifier` that ensures a **unique sorting position** for each app, this avoids problems when the binary search algorithm is walking through apps with the same apex index.

> Info: I rely on comparing the app ids for the tiebreaker because those ids are auto-generated strings and I can ensure that are unique and don't have any extraneous character that could cause unexpected behaviors, in that case, I would be forced to use `String.prototype.localeCompare()` that would affect the performance of the operation.

## Tooling

I like to be aware of what happens under the hoods, so I sat up all the tool scaffold for this project. To be fair, I am not an expert in all the tools I used, but I know very well what they do, and how they do it.

I will mention the used development tools in dependency order:

- `@babel/core`: The renowned JavaScript compiler, I use it to compile the code to something interpretable by the browser it does a whole bunch of things, I don't think it is useful to mention them in detail.

- `@babel/plugin-transform-react-jsx`: Used to transpile the JSX syntax to function calls that are handled by the jsx-runtime.

- `@babel/preset-env`: Also very known, it allows babel to compile the JavaScript for a specific target.

- `autoprefixer`: Prefixes the CSS properties with the required vendor prefixes for the targets specified in the `.browserlistrc` file (used as a `postcss` plugin).

- `babel-loader`: Allows Webpack to use babel.

- `copy-webpack-plugin`: Copies files to the Webpack build directory.

- `core-js`: Is used in tandem with `@babel/core` and `@babel/preset-env` to selectively add polyfills based on your code and the `.browserlistrc` config file.

- `CSS-loader`: Allows `webpack` to load CSS.

- `HTML-webpack-plugin`: Allows `webpack` to load, parse and modify HTML files, used to set up the `index.html` file of the project.

- `husky`: Used to run the tests and the linter before committing (it basically configures local git hooks).

- `jest`: Test framework that runs the unit tests.

- `jest-fetch-mock`: Tool to mock the fetch API, I use it to inject test data to the service.

- `lint-staged`: Along with `husky` is used to run the tests and linting, but just in those files that are staged to be committed.

- `mini-CSS-extract-plugin`: Allows `webpack` to extract CSS from files, and enables Hot Module Reloading for CSS.

- `node-sass`: Sass code compiler.

- `postcss`: Plugable tool that allows transforming CSS with JavaScript (one can see it as the babel for CSS).

- `postcss-loader`: Allows `webpack` to use `postcss`.

- `rimraf`: Removes files asynchronously, works in any platform. Used to clean the project.

- `sass-loader`: Allows `webpack` to use `node-sass`.

- `standardx`: Used as a linter. I normally use `standardjs`, but this time I wanted to modify the ruleset (because it was warning me about react keys on the JSX, ad this was not relevant in this case).

- `style-loader`: Used to insert the compiled CSS to the HTML.

- `webpack`: Gets all the files and pipelines their content to the proper tools based on the specified configuration, It orchestrates the synchronization between almost all the aforementioned tools.

- `webpack-cli`: Command Lin Interface for `webpack`.

- `webpack-dev-server`: Watches for changes, runs `webpack`, and serves the changes.

## Conclusion

I really enjoyed developing this. It has been a fresh breeze since I am very used to work with React at work, which I like, but it is good to get out of my comfort zone from time to time.

I am pretty proud of the result, and whether you like it or not, I would love to hear feedback from you. Thanks again for your time.