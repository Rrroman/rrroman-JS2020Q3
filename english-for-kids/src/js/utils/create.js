/**
 * @param {String} el
 * @param {String} classNames
 * @param {HTMLElement} / [Array of HTML Elements] child/children
 * @param {HTMLElement} parent
 * @param {...array} dataAttr [['id', 'cell'], ['number', '1']] -> example data-number=''
 */

// https://www.youtube.com/watch?v=nuQW_cBLR6Q&feature=youtu.be Code from live coding of virtual-keyboard by Xmelsky

export default function create(el, classNames, children, parent, ...dataAttr) {
  let element = null;
  try {
    element = document.createElement(el);
  } catch (error) {
    throw new Error(
      'Unable to create HTML element, error in element tag parameter!'
    );
  }

  if (classNames) element.classList.add(...classNames.split(' '));

  if (children && Array.isArray(children)) {
    children.forEach(
      (childElement) => childElement && element.appendChild(childElement)
    );
  } else if (typeof children === 'object') {
    element.append(children);
  } else if (typeof children === 'string') {
    element.innerHTML = children;
  }

  if (parent) parent.appendChild(element);

  if (dataAttr.length) {
    dataAttr.forEach(([attrName, attrValue]) => {
      if (attrValue === '') {
        element.setAttribute(attrName, '');
      } else if (
        attrName.match(
          /src|href|target|value|id|placeholder|cols|rows|spellcheck|type|width|height/
        )
      ) {
        element.setAttribute(attrName, attrValue);
      } else {
        element.dataset[attrName] = attrValue;
      }
    });
  }

  return element;
}
