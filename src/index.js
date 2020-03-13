import createPlayer from './elems/player';
import { wrap } from './utils';

export default function init(videoEl, opts) {
  const playerEl = createPlayer(videoEl, opts);

  wrap(videoEl, playerEl);
}

document.querySelectorAll('.sr-video').forEach(videoEl => {
  const source = videoEl.querySelector('source');

  init(videoEl, { src: source.src, type: source.type });
});
