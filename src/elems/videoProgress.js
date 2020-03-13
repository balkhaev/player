import { createElement, createStyles, getClassName } from "../utils";
import createProgress, { classes as progressClasses } from "./ui/progress";

export const classes = {
  videoWrapper: getClassName("video-progress-wrapper")
};

createStyles(`
.${classes.videoWrapper} {
  position: absolute;
  height: 4px;
  top: -1px;
  left: 8px;
  right: 8px;
}
.${classes.videoWrapper} .${progressClasses.progress} {
  background: rgba(163, 21, 69);
}
.${classes.videoWrapper} .${progressClasses.progressTrack}:hover {
  box-shadow: 0 0 0 8px rgba(163, 21, 69, .3);
}
.${classes.videoWrapper} .${progressClasses.progressWrapper} {
  background: rgba(163, 21, 69, .5);
}
`);

export default function createVideoProgress(attrs) {
  const videoProgressEl = createElement("div", {
    className: classes.videoWrapper
  });

  const videoProgress = createProgress(attrs).mount(videoProgressEl);

  const methods = {
    update(progress) {
      videoProgress.update(progress);
    },
    mount(el) {
      el.appendChild(videoProgressEl);

      return methods;
    }
  };

  return methods;
}
