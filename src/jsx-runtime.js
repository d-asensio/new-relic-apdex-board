export default function createElement (tag, props, ...children) {
  const element = document.createElement(tag)

  _addPropsToElement(props, element)
  _appendChildrenToElement(children, element)

  return element
}

function _addPropsToElement (props, element) {
  if (props === null) return
  const { className } = props

  if (className) {
    const sanitizedClassNames = _sanitizeClassName(className)

    for (const sanitizedClass of sanitizedClassNames) {
      element.classList.add(sanitizedClass)
    }
  }
}

function _sanitizeClassName (className) {
  return className
    .split(' ')
    .filter(Boolean)
}

function _appendChildrenToElement (children, element) {
  for (const child of children) {
    if (Array.isArray(child)) {
      _appendChildrenToElement(child, element)
    } else {
      _appendChildToElement(child, element)
    }
  }
}

function _appendChildToElement (child, element) {
  const nodeToAppend = (
    child instanceof HTMLElement
      ? child
      : document.createTextNode(child)
  )

  element.appendChild(nodeToAppend)
}
