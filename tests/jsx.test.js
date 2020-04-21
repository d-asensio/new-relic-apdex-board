/** @jsx jsx */
import jsx from '../src/jsx-runtime'

describe('JSX Rumtime', () => {
  it('creates an empty element', () => {
    expect(<div />).toBeInstanceOf(HTMLDivElement)
  })

  it('creates an element with text', () => {
    const text = 'I am a text'
    const divElement = <div>{text}</div>

    expect(divElement.innerHTML).toBe(text)
  })

  it('creates an element with another element', () => {
    const divElement = (
      <div>
        <span>Child</span>
      </div>
    )

    expect(divElement.innerHTML).toMatchSnapshot()
  })

  it('creates an element with multiple elements', () => {
    const divElement = (
      <div>
        <span>Child</span>
        <span>Child</span>
        <span>Child</span>
      </div>
    )

    expect(divElement.innerHTML).toMatchSnapshot()
  })

  it('creates an element with an array of elements', () => {
    const divElement = (
      <div>
        {[
          <span>Child</span>,
          <span>Child</span>,
          <span>Child</span>
        ]}
      </div>
    )

    expect(divElement.innerHTML).toMatchSnapshot()
  })

  it('creates an element with a single class', () => {
    const divElement = (<div className='class' />)
    expect(
      divElement.classList.contains('class')
    ).toBe(true)
  })

  it('creates an element with multiple classes', () => {
    const divElement = (<div className='class1 class2' />)
    expect(divElement.classList).toMatchSnapshot()
  })

  it('creates an element with multiple classes if `className` contains arbitrary spaces', () => {
    const divElement = (<div className='class1   class2 ' />)
    expect(divElement.classList).toMatchSnapshot()
  })

  it('creates an element with no classes if `className` is falsy', () => {
    const divElement = (<div className={null} />)
    expect(divElement.classList.length).toBe(0)
  })
})