// Polyfills the `window.storage` API (get/set/delete/list) that the training
// log component was originally written against, using the browser's
// localStorage. This makes all your data persist locally on whatever device
// / browser you use the app in (including Safari on iPhone) — nothing is
// sent to any server.
//
// Storage keys are namespaced so this app won't collide with anything else
// you might have stored on the same domain.

const PREFIX = 'training-log:';

function fullKey(key) {
  return `${PREFIX}${key}`;
}

async function get(key /*, shared */) {
  try {
    const raw = window.localStorage.getItem(fullKey(key));
    if (raw === null) return null;
    return { key, value: raw, shared: false };
  } catch (e) {
    return null;
  }
}

async function set(key, value /*, shared */) {
  try {
    window.localStorage.setItem(fullKey(key), value);
    return { key, value, shared: false };
  } catch (e) {
    return null;
  }
}

async function del(key /*, shared */) {
  try {
    window.localStorage.removeItem(fullKey(key));
    return { key, deleted: true, shared: false };
  } catch (e) {
    return null;
  }
}

async function list(prefix = '' /*, shared */) {
  try {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(PREFIX)) {
        const short = k.slice(PREFIX.length);
        if (short.startsWith(prefix)) keys.push(short);
      }
    }
    return { keys, prefix, shared: false };
  } catch (e) {
    return null;
  }
}

if (typeof window !== 'undefined') {
  window.storage = { get, set, delete: del, list };
}

export default window.storage;
