import { createElement, createStyles, getClassName, addClassName, removeClassName } from "../../utils";

export const classes = {
  dropdown: getClassName("dropdown"),
  item: getClassName("dropdown-item"),
  hide: getClassName("dropdown-hide")
};

createStyles(`
.${classes.dropdown} {
  position: absolute;
  width: 120px;
  bottom: 110%;
  left: 50%;
  color: #fff;
  font-size: 13px;
  transform: translateX(-50%);
  transition: opacity .3s, height .1s;
  overflow: hidden;
  border-radius: 2px;
  background: rgba(28,28,28,0.9);
  text-shadow: 0 0 2px rgba(0,0,0,.5);
}
.${classes.item} {
  padding: 10px;
  cursor: pointer;
  transition: background .3s;
}
.${classes.item}:hover {
  background: rgba(255,255,255,.1);
}
.${classes.item} + .${classes.item} {
  border-top: 1px solid rgba(255,255,255,.3);
}
.${classes.dropdown}.${classes.hide} {
  opacity: 0;
  height: 0;
}
`);

export default function createDropdown(opts) {
  let opened = false;

  const dropdownEl = createElement("div", {
    className: addClassName(classes.dropdown, classes.hide)
  });

  document.addEventListener("click", e => {
    const isBlock = e.path.indexOf(dropdownEl.parentNode) > -1;

    if (!isBlock && opened) {
      methods.hide();
    }
  });

  const methods = {
    toggle() {
      opened ? methods.hide() : methods.show();
    },
    hide() {
      opened = false;
      dropdownEl.className = addClassName(dropdownEl.className, classes.hide);
    },
    show() {
      opened = true;
      dropdownEl.className = removeClassName(dropdownEl.className, classes.hide);
    },
    addItem(text, attrs) {
      const itemEl = createElement("div", {
        textContent: text,
        className: classes.item,
        ...attrs
      });

      dropdownEl.appendChild(itemEl);
    },
    mount(el) {
      el.appendChild(dropdownEl);

      return methods;
    }
  };

  return methods;
}
