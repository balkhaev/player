import { createElement, createStyles, getClassName } from "../utils";
import { volumeIcon, muteIcon } from "../icons";

import createProgress, { classes as progressClasses } from "./ui/progress";
import createIconButton from "./ui/iconButton";

export const classes = {
  volume: getClassName("volume-progress"),
  volumeTrack: getClassName("volume-progress-track"),
  volumeWrapper: getClassName("volume-progress-wrapper")
};

createStyles(`
.${classes.volume} {
  position: relative;
  height: 100%;
  color: #fff;
}
.${classes.volumeWrapper} {
  display: flex;
  align-items: center;
  padding-left: 16px;
}
.${classes.volumeWrapper} .${progressClasses.progressWrapper} {
  width: 0;
  height: 2px;
  opacity: 0;
  margin-right: 8px;
  transition: width .3s, opacity .3s;
}
.${classes.volumeWrapper}:hover .${progressClasses.progressWrapper} {
  display: block;
  width: 80px;
  opacity: 1;
}
`);

export default function createVolume(videoEl) {
  let prevVolume = videoEl.volume;

  const setVolume = volume => {
    const isMute = volume === 0;
    const newIcon = isMute ? muteIcon : volumeIcon;

    if (volumeButton.getIcon() !== newIcon) {
      volumeButton.setIcon(newIcon);
    }

    videoEl.volume = volume;
  };

  const volumeWrapperEl = createElement("div", {
    className: classes.volumeWrapper
  });

  const volumeProgress = createProgress({
    progress: videoEl.volume * 100,
    onupdate(progress, isEnd) {
      const isMute = progress === 0;

      if (isEnd && !isMute) {
        prevVolume = progress / 100;
      }

      setVolume(progress / 100);
    }
  }).mount(volumeWrapperEl);

  const volumeButton = createIconButton(volumeIcon, {
    onclick() {
      const isMuted = videoEl.volume === 0;
      const newVolume = isMuted ? prevVolume : 0;

      if (!isMuted) {
        prevVolume = videoEl.volume;
      }

      volumeProgress.update(newVolume * 100);

      setVolume(newVolume);
    }
  }).mount(volumeWrapperEl);

  const methods = {
    set(volume) {
      setVolume(volume);

      volumeProgress.update(volume * 100);
    },
    mount(el) {
      el.appendChild(volumeWrapperEl);

      return methods;
    }
  };

  return methods;
}
