import {writable, get} from 'svelte/store';

export function dropdownModel() {

	const isActive = writable(false);
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

		/**
		 * if, true, isExpanded must be updated depending on the number of items list.
		 */
		isActive,

		/**
		 * Readable store. True if the dropdown is effectively open (list with elements and isActive)
		 */
		isExpanded,

		/**
		 * List of items in the dropdown
		 */
		list,

		/**
		 * Highlighted item on the list, candidate to be selected
		 */
		highlightedItem,

		/**
		 * Selected item.
		 */
		selectedItem,

		/**
		 * Move the highlight item to the next element
		 */
		moveDown() {
			highlightedItem.update(function($highlightedItem) {
				return moveHighlighted($highlightedItem, 1);
			});
		},

		/**
		 * Move the highlight item to the previous element
		 */
		moveUp() {
			highlightedItem.update(function($highlightedItem) {
				return moveHighlighted($highlightedItem, -1);
			});
		},

		/**
		 * Selected a element in the list. By default, the highlighted element is considered.
		 */
		select(item = get(highlightedItem)) {
			if (item && get(list).includes(item)) {
				selectedItem.set(item);
			}
		}
	};


}

