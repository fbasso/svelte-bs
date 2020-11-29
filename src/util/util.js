export function normalize(value) {
	return JSON.parse(value);
}

export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const debounce = function(fn, time) {
	let timer;
	return (...params) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {fn(...params);}, time);
	};
};

