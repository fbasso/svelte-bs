export function substract(initialArray, arrayToSubstract) {
	return initialArray.filter(n => !arrayToSubstract.includes(n));
}