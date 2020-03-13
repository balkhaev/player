import { createStyles, getClassName, createElement } from "../../utils";

export const classes = {
  spacer: getClassName("spacer")
};

createStyles(`
.${classes.spacer} {
  flex: 1;
}`);

export default function createSpacer(attrs) {
  const spacerEl = createElement("div", {
    className: classes.spacer,
    ...attrs
  });

  return {
    mount(el) {
      el.appendChild(spacerEl);
    }
  };
}
