export default function createElement (tag, props, ...children) {
  const element = document.createElement(tag)

  if (props !== null) {
    _addPropsToElement(props, element)
  }

  _appendChildrenToElement(children, element)

  return element
}

function _addPropsToElement (props, element) {
  const { className, ...attributes } = props

  _addAttributesToElement(attributes, element)

  if (className) {
    _addClassNameToElement(className, element)
  }
}

function _addAttributesToElement (attributes, element) {
  const attributeEntries = Object.entries(attributes)

  for (const [attrName, attrValue] of attributeEntries) {
    _attributeSupportedByElementOrThrow(attrName, element)

    element.setAttribute(attrName, attrValue)
  }
}

function _attributeSupportedByElementOrThrow (attributeName, element) {
  if (!_isAttributeSupportedByElement(attributeName, element)) {
    throw new Error(
      `A "${element.tagName.toLowerCase()}" element do not support the attribute "${attributeName}".`
    )
  }
}

function _isAttributeSupportedByElement (attributeName, element) {
  if (_isDataAttribute(attributeName)) return true
  if (_isAriaAttribute(attributeName)) return true

  return attributeName in element
}

function _isDataAttribute (attributeName) {
  return attributeName.startsWith('data-')
}

function _isAriaAttribute (attributeName) {
  return attributeName.startsWith('aria-')
}

function _addClassNameToElement (className, element) {
  const sanitizedClassNames = _sanitizeClassName(className)

  for (const sanitizedClass of sanitizedClassNames) {
    element.classList.add(sanitizedClass)
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
  const safeChildNode = _createSafeChildNode(child, element)

  element.appendChild(safeChildNode)
}

function _createSafeChildNode (child) {
  if (child instanceof HTMLElement || child instanceof Text) {
    return child
  }

  return document.createTextNode(child)
}
