import {writable, get} from 'svelte/store';

export function getState() {

	const isExpanded = writable(false);
	const list = writable([]);
	const highlightedItem = writable(null);
	const selectedItem = writable(null);

	function moveHighlighted($highlightedItem, direction) {
		const $list = get(list);
		if (!$list.length) {
			return null;
		}

		const maxIndex = $list.length - 1;
		const index = $list.indexOf($highlightedItem);
		if (index === -1) {
			return direction > 1 ? $list[0] : $list[maxIndex];
		}

		return $list[Math.max(Math.min(index + direction, maxIndex), 0)];
	}

	return {
		isExpanded,
		list,
		highlightedItem,
		selectedItem,

		moveDown() {
			highlightedItem.update(function($highlightedItem) {
				return moveHighlighted($highlightedItem, 1);
			});
		},

		moveUp() {
			highlightedItem.update(function($highlightedItem) {
				return moveHighlighted($highlightedItem, -1);
			});
		},

		select(item = get(highlightedItem)) {
			if (item && get(list).includes(item)) {
				selectedItem.set(item);
			}
		}
	};


}