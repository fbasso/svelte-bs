export function normalize(value) {
	return JSON.parse(value);
}

export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
