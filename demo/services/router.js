
import { writable, derived } from 'svelte/store';

export let baseref = '/' + document.querySelector('base').getAttribute('href').replace(/\/$/, '');
if (baseref === '/') {
	baseref = '';
}

const parametersToString = (parameters) => {
	if (!parameters) {
		return '';
	}

	let arParameters = [];
	for(let key in parameters) {
		arParameters.push(`${key}=${parameters[key]}`);
	}

	return arParameters.join('&');
};

const regExp = /^https?:\/\//;

const onClick = (e) => {
  const element = e.target;
  if (element.tagName.toLowerCase() == 'a' && !e.ctrlKey && !element.getAttribute('target')) {
	const href = element.getAttribute('href');
	if (!regExp.test(href)) {
		e.preventDefault();
		history.pushState(null, '', baseref + href);
		location.set({pathname: href});
	}
  }
};

const onPopstate = (e) => {
  const href = document.location.pathname.replace(baseref, '');
  location.set({pathname: href});
};


const langRegExp = /^\/([^/]+)/gi;

function parseUrl(url) {
	let pathname = url.pathname.replace(baseref, '');
	let lang = 'en';
	pathname = pathname.replace(langRegExp, (_, pLang) => {
		lang = pLang;
		return '';
	}).replace(/^\//, '');

	return {lang, pathname};
}

export const location = (() => {
	const {lang, pathname} = parseUrl(window.location);

	const { subscribe, set } = writable({baseref, lang, pathname, url: new URL(window.location)}, () => {
		document.body.addEventListener('click', onClick);
		window.addEventListener('popstate', onPopstate);

		return () => {
			document.body.removeEventListener('click', onClick);
			window.removeEventListener('popstate', onPopstate);
		};
	});

	return {
		subscribe,
		set: (url) => {
			let href =  baseref + url.pathname;
			const strParameters = parametersToString(url.parameters);
			if (strParameters) {
				href += '?' + strParameters;
			}
			const {lang, pathname} = parseUrl(window.location);

			history.pushState(null, '', href);
			set({
				baseref,
				lang,
				pathname,
				url: url
			});
		}
	};

})();

export const lang = derived(location, ($location) => {
	return $location.lang;
});
