import { getClassName, createStyles, createElement, addClassName } from "../utils";
import { gearIcon } from "../icons";
import createIconButton from "./ui/iconButton";
import createDropdown from "./ui/dropdown";

export const classes = {
  settings: getClassName("settings")
};

createStyles(`
.${classes.settings} {
  position: relative;
}
`);

export default function createOptions(mountEl, opts = {}) {
  const { className, ...attrs } = opts;

  const settingsEl = createElement("div", {
    className: addClassName(classes.settings, className),
    ...attrs
  });

  const dropdown = createDropdown().mount(settingsEl);

  createIconButton(gearIcon, {
    onclick() {
      dropdown.toggle();
    }
  }).mount(settingsEl);

  const methods = {
    mount(el) {
      el.appendChild(settingsEl);

      return methods;
    },
    setLevels(levels) {
      levels.forEach(level => {
        dropdown.addItem(level.height + "p");
      });
    }
  };

  return methods;
}
