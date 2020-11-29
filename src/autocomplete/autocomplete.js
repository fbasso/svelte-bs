import { qsa, addClass, removeClass } from "../util/dom.js";

export async function getSuggestionsInner(searchValue, isSuggestionsEnable, getSuggestionsFn) {
	if (!searchValue || !isSuggestionsEnable) {
		return [];
	}

	const response = await getSuggestionsFn;

	return response.slice(0, 10) || [];
}

export function getItems(node) {
	return node ? qsa(node, '.dropdown-item') : [];
}

function setActive(node, index) {
	const items = getItems(node);
	for(const item of items) {
		removeClass(item, 'active');
	}
	if (index != null) {
		addClass(items[index], 'active');
	}
}

export function getActiveIndex(e, {node, activeIndex, items, force}) {
	if (!node) {
		return activeIndex;
	}
	const {which} = e;
	const isExpanded = items.length;

	if (isExpanded && which === 13) {
		getItems(node)[activeIndex].click();
		return activeIndex;
	}

	let itemFocusIncrement = which == 40 ? 1 : which == 38 ? -1 : 0;
	if (itemFocusIncrement) {
		if (isExpanded) {
			const lastIndex = items.length - 1;
			if (activeIndex == null) {
				activeIndex = itemFocusIncrement === 1 ? 0 : lastIndex;
			} else {
				activeIndex += itemFocusIncrement;
			}
			activeIndex = activeIndex < 0 ? 0 : activeIndex > lastIndex ? lastIndex : activeIndex;
		} else {
			if (force) {
				if (activeIndex == null) {
					activeIndex = 0;
				}
			}
		}
		e.preventDefault();
	} else {
		activeIndex = null;
	}

	if (force && isExpanded && activeIndex == null) {
		activeIndex = 0;
	}

	setActive(node, activeIndex);
	return activeIndex;
}