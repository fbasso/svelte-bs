import {get} from 'svelte/store';

export function bindUpdate(store) {
	return function(fn) {
		store.set(fn(get(store)));
	};
}