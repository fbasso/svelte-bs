import {writable, get} from 'svelte/store';

export const locales = writable({});

export function getLocales($locales, context) {
	const mainLocales = $locales['_main'] || {};
	const contextLocales = $locales[context] || {};

	const result = {...mainLocales, ...contextLocales};
	return result;
}

const placeholderRegExp = /\$\{([_a-z-A-Z0-9]+)\}/;
export function replace(str = '', data = {}) {
	str = str.replace(placeholderRegExp, (_, propName) => {
		return data[propName] || `??${propName}??`;
	});
	return str;
}
