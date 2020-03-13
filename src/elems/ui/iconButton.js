import { createElement, createStyles, getClassName, addClassName } from "../../utils";

export const classes = {
  button: getClassName("button")
};

createStyles(`
.${classes.button} {
  color: #fff;
  padding: 12px;
  overflow: visible;
  font-size: 1.5rem;
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
}
.${classes.button}:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
`);

export default function createIconButton(icon, opts = {}) {
  const { tag = "div", className, ...attrs } = opts;

  const iconButtonEl = createElement(tag, {
    innerHTML: icon,
    className: addClassName(classes.button, className),
    ...attrs
  });

  const methods = {
    on(event, handler) {
      iconButtonEl.addEventListener(event, handler);
    },
    setIcon(icon) {
      iconButtonEl.innerHTML = icon;
    },
    getIcon() {
      return iconButtonEl.innerHTML;
    },
    mount(el) {
      el.appendChild(iconButtonEl);

      return methods;
    }
  };

  return methods;
}
