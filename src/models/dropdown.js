import {writable, derived, get} from 'svelte/store';
import {bindUpdate} from './util';

export function createDropdownModel() {

	const isOpen = writable(false);
	const list = writable([]);

	const isExpanded = derived([isOpen, list], function([isOpen$, list$]) {
		return isOpen$ && list$.length > 0;
	});

	const highlightedItem = function() {
		const store = writable(null);
		const newStore = {
			...store,
			set: (item) => setStoreItem(store, item),
		};
		newStore.update = bindUpdate(newStore);
		return newStore;
	}();

	const selectedItem = function() {
		const store = writable(null);
		const newStore = {
			...store,
			set: (item) => setStoreItem(store, item),
		};
		newStore.update = bindUpdate(newStore);
		return newStore;
	}();

	function setStoreItem(store, item) {
		if (get(list).includes(item)) {
			store.set(item);
		}
	}

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
		 * if true, isExpanded will be true if the item list is not empty.
		 */
		isOpen,

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
				isOpen.set(false);
			}
		}

	};


}

