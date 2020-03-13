import Hls from "hls.js";

import { createElement, createStyles, getClassName } from "../utils";

import createToolbar from "./toolbar";

export const classes = {
  player: getClassName("player")
};

createStyles(`
.${classes.player} {
  position: relative;
  font-family: Arial;
  overflow: hidden;
}
`);

export default function createPlayer(videoEl, opts) {
  const playerEl = createElement("div", {
    className: classes.player
  });

  const toolbar = createToolbar(videoEl).mount(playerEl);

  const onReady = () => {
    toolbar.play().catch(() => {
      toolbar.setVolume(0);
      toolbar.play();
    });
  };

  videoEl.addEventListener("click", () => {
    toolbar.toggle();
  });

  playerEl.addEventListener("mouseleave", () => {
    if (!videoEl.paused) {
      toolbar.hide();
    }
  });

  playerEl.addEventListener("mouseenter", () => {
    if (toolbar.isHidden()) {
      toolbar.show();
    }
  });

  let interId = null;

  playerEl.addEventListener("mousemove", e => {
    const isToolbarParent = e.path.indexOf(toolbar.getElement()) > -1;

    toolbar.isHidden() && toolbar.show();
    interId && clearTimeout(interId);

    if (!videoEl.paused && !isToolbarParent) {
      interId = setTimeout(() => {
        interId = null;
        toolbar.hide();
      }, 2000);
    }
  });

  if (Hls.isSupported()) {
    const hls = new Hls();

    hls.loadSource(opts.src);
    hls.attachMedia(videoEl);
    hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      toolbar.setLevels(data.levels);
      onReady();
    });
  } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
    videoEl.src = opts.src;
    videoEl.addEventListener("loadedmetadata", function() {
      onReady();
    });
  }

  return playerEl;
}
