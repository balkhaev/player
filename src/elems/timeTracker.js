import { getClassName, createStyles, createElement, humanReadableSeconds } from "../utils";

export const classes = {
  timeTracker: getClassName("time-tracker")
};

createStyles(`
.${classes.timeTracker} {
  color: #fff;
  margin-left: 8px;
  font-size: 15px;
}
`);

export default function createTime() {
  const timeTrackerEl = createElement("div", {
    className: classes.timeTracker,
    textContent: "00:00"
  });

  const methods = {
    update(currentTime, duration) {
      const timeSince = humanReadableSeconds(Math.floor(currentTime));
      const humanDuration = humanReadableSeconds(duration);

      timeTrackerEl.textContent = timeSince + " / " + humanDuration;
    },
    mount(el) {
      el.appendChild(timeTrackerEl);

      return methods;
    }
  };

  return methods;
}
