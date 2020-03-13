import { createStyles, getClassName, addClassName, removeClassName, createElement } from "../utils";
import { playIcon, pauseIcon, sportrecsIcon, fullscreenIcon } from "../icons";

import createIconButton from "./ui/iconButton";
import createSpacer from "./ui/spacer";

import createVideoProgress from "./videoProgress";
import createTimeTracker from "./timeTracker";
import createSettings from "./options";
import createVolume from "./volume";

export const classes = {
  toolbar: getClassName("toolbar"),
  toolbarHide: getClassName("toolbar-hide")
};

createStyles(`
.${classes.toolbar} {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 8px;
  align-items: center;
  background-image: linear-gradient(transparent, rgba(0,0,0,0.6), rgba(0,0,0,0.9));
  transition: transform .3s;
}
.${classes.toolbar}.${classes.toolbarHide} {
  transform: translateY(100%);
}
`);

export default function createToolbar(videoEl) {
  const toolbarEl = createElement("div", {
    className: classes.toolbar
  });

  const playPauseButton = createIconButton(playIcon, {
    onclick() {
      methods.toggle();
    }
  }).mount(toolbarEl);

  const timeTracker = createTimeTracker().mount(toolbarEl);

  const videoProgress = createVideoProgress({
    onupdate(progress) {
      videoEl.currentTime = (videoEl.duration / 100) * progress;
    }
  }).mount(toolbarEl);

  createSpacer().mount(toolbarEl);

  const volume = createVolume(videoEl).mount(toolbarEl);

  const settings = createSettings().mount(toolbarEl);

  createIconButton(sportrecsIcon, {
    tag: "a",
    href: "https://sportrecs.com",
    target: "_blank"
  }).mount(toolbarEl);

  createIconButton(fullscreenIcon).mount(toolbarEl);

  videoEl.addEventListener("timeupdate", () => {
    if (isNaN(videoEl.duration)) {
      return;
    }

    const progress = (videoEl.currentTime / videoEl.duration) * 100;

    timeTracker.update(videoEl.currentTime, videoEl.duration);
    videoProgress.update(progress);
  });

  const methods = {
    play() {
      return videoEl.play().then(() => {
        playPauseButton.setIcon(pauseIcon);
      });
    },
    pause() {
      videoEl.pause();
      playPauseButton.setIcon(playIcon);
    },
    toggle() {
      videoEl.paused ? methods.play() : methods.pause();
    },
    hide() {
      toolbarEl.className = addClassName(toolbarEl.className, classes.toolbarHide);
    },
    show() {
      toolbarEl.className = removeClassName(toolbarEl.className, classes.toolbarHide);
    },
    isHidden() {
      return toolbarEl.className.indexOf(classes.toolbarHide) > -1;
    },
    getElement() {
      return toolbarEl;
    },
    setVolume(newVolume) {
      return volume.set(newVolume);
    },
    mount(el) {
      el.appendChild(toolbarEl);

      return methods;
    },
    setLevels(levels) {
      settings.setLevels(levels);
    }
  };

  return methods;
}
