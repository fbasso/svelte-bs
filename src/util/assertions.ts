/* eslint-disable no-console */
import {substract} from '#sveltrap/util/array';

export function assertJsonKeys(json, acceptedKeys) {
	const newArray = substract(Object.keys(json), acceptedKeys);
	if (newArray.length) {
		console.group('Check keys');
		console.warn('Some keys are not accepted', newArray);
		console.warn('Accepted keys', acceptedKeys);
		console.groupEnd();
		return false;
	}
	return true;
}
