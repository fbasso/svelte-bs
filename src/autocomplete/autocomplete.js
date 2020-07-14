export async function getSuggestionsInner(searchValue, isSuggestionsEnable, getSuggestionsFn) {
	if (!searchValue || !isSuggestionsEnable) {
		return [];
	}

	const response = await getSuggestionsFn;

	return response.slice(0, 10) || [];
}
