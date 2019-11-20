
import { readable } from 'svelte/store';

export const location = readable(document.location.pathname, (set) => {

  const regExp = /^\//;
  const onClick = (e) => {
    const element = e.target;
    if (element.tagName.toLowerCase() == 'a') {
      const href = element.getAttribute('href');
      if (regExp.test(href)) {
        e.preventDefault();
        history.pushState(null, '', href);
        // console.log('pushState', href);
        set(href);
      }
    }
  };

  const onPopstate = (e) => {
    const href = document.location.pathname;
    // console.log('onPopstate', href);
    set(href);
  };

  document.body.addEventListener('click', onClick);
  window.addEventListener('popstate', onPopstate);

  return () => {
    document.body.removeEventListener('click', onClick);
    window.removeEventListener('popstate', onPopstate);
  }
});

/*
export const registerRoute = function(regExp, callback) {

  const handleRoute = (e) => {
    e.preventDefault();
    const element = e.target;
    if (element.tagName.toLowerCase() == 'a') {
      const href = element.getAttribute('href');
      const matches = href.match(regExp);
      if (matches && matches[0]) {
        e.preventDefault();
        history.pushState(null, '', href);
        callback(href, matches);
      }
    }
  }
  window.addEventListener('popstate', () => {
    const href = document.location.pathname;
    callback(href, href.match(regExp));
  });

  return handleRoute;
};

export const unregisterRoute = function(callback) {
  window.removeEventListener('popstate', callback);
};
*/

