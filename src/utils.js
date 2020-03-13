export function createElement(type, attrs) {
  return Object.assign(document.createElement(type), attrs);
}

export function createStyles(styles) {
  document.head.appendChild(
    createElement('style', {
      textContent: styles
    })
  );
}

export function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

export function humanReadableSeconds(seconds) {
  seconds = parseInt(seconds, 10);

  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - hours * 3600) / 60);
  var seconds = seconds - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  if (hours === '00') {
    return minutes + ':' + seconds;
  }

  return hours + ':' + minutes + ':' + seconds;
}

export function getClassName(name) {
  return name;
}

export function addClassName(...args) {
  return args
    .filter(className => typeof className === 'string')
    .filter((v, i, a) => a.indexOf(v) === i)
    .join(' ');
}

export function removeClassName(classes, name) {
  return classes
    .split(' ')
    .filter(className => className !== name)
    .join(' ');
}
