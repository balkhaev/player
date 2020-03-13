import { createElement, createStyles, getClassName } from "../../utils";

export const classes = {
  progress: getClassName("progress"),
  progressTrack: getClassName("progress-track"),
  progressWrapper: getClassName("progress-wrapper")
};

createStyles(`
.${classes.progress} {
  position: relative;
  width: 0;
  height: 100%;
  background: rgba(255, 255, 255, .5);
}
.${classes.progressTrack} {
  position: absolute;
  width: 12px;
  height: 12px;
  top: -4px;
  right: 0;
  border-radius: 50%;
  background: white;
  transition: box-shadow .3s;
}
.${classes.progressTrack}:hover {
  box-shadow: 0 0 0 8px rgba(255, 255, 255, .3);
}
.${classes.progressWrapper} {
  height: 100%;
  cursor: pointer;
  background: rgba(255, 255, 255, .3);
}
`);

export default function createProgress(opts = {}) {
  const { progress = 0, onupdate, ...attrs } = opts;

  let preventClick = false;
  let dragStartPosX = null;
  let dragStartProgress = null;

  const getProgressUpdate = clientX => {
    const shiftX = dragStartPosX - clientX;
    const percentX = (shiftX / progressWrapperEl.offsetWidth) * 100;

    return dragStartProgress - percentX;
  };

  const progressWrapperEl = createElement("div", {
    className: classes.progressWrapper,
    ...attrs
  });

  const progressEl = createElement("div", {
    className: classes.progress,
    style: `width: ${progress}%`
  });

  const progressTrackEl = createElement("div", {
    className: classes.progressTrack
  });

  progressTrackEl.addEventListener("mousedown", e => {
    dragStartPosX = e.clientX;
    dragStartProgress = methods.getProgress();
  });

  document.addEventListener("mousemove", e => {
    if (!dragStartPosX) {
      return;
    }

    const progress = methods.update(getProgressUpdate(e.clientX));

    if (typeof onupdate === "function") {
      onupdate(progress);
    }
  });

  document.addEventListener("mouseup", e => {
    if (dragStartPosX) {
      const progress = methods.update(getProgressUpdate(e.clientX));

      dragStartPosX = null;
      preventClick = true;

      onupdate(progress, true);
    }
  });

  progressWrapperEl.addEventListener("click", e => {
    if (preventClick) {
      preventClick = false;
      return;
    }

    const percentX = (e.offsetX / progressWrapperEl.offsetWidth) * 100;
    const progress = methods.update(percentX);

    if (typeof onupdate === "function") {
      onupdate(progress, true);
    }
  });

  progressWrapperEl.appendChild(progressEl);
  progressEl.appendChild(progressTrackEl);

  const methods = {
    update(progress) {
      if (progress < 0) {
        progress = 0;
      } else if (progress > 100) {
        progress = 100;
      }

      progressEl.style.width = progress + "%";

      return progress;
    },
    getProgress() {
      return parseInt(progressEl.style.width.replace("%", ""));
    },
    mount(el) {
      el.appendChild(progressWrapperEl);

      return methods;
    }
  };

  return methods;
}
