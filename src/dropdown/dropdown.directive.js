import Popper from 'popper.js';
import { qs, qsa, addEvent, addClass, removeClass, contains, containsClass } from '../util/dom.js';

const _isExpanded = (node) => {
	const menuElement = qs(node, '.dropdown-menu') || qs(node, '[slot="menu"]');
	return menuElement && containsClass(menuElement, 'show');
};

export const dropdown = (node, params) => {
	return dropdownDirective(node, Popper, params);
};

export const staticDropdown = (node, params) => {
	return dropdownDirective(node, null, params);
};

export const dropdownDirective = (node, PopperClass, {isExpandedInit, toggleExpanded} = {isExpanded: false, toggleExpanded: null}) => {

	let eventsRemoval = [];
	let isIn = false;
	let focusIndex = null;

	const dropdownToggle = qs(node, '.dropdown-toggle');
	if (dropdownToggle) {
		dropdownToggle.setAttribute('aria-haspopup', 'true');
	}

	const destroyEvents = () => {
		for(let fn of eventsRemoval) {
			fn();
		}
		eventsRemoval = [];
	}

	const dropdownClick = (e) => {
		const target = e.target;

		let isExpanded = !_isExpanded(node);
		if (containsClass(target, 'dropdown-toggle')) {
			isExpanded = !_isExpanded(node);
			e.preventDefault();
		} else if (containsClass(target, 'dropdown-item')) {
			isExpanded = false;
		} else {
			return;
		}

		if (toggleExpanded) {
			toggleExpanded(isExpanded);
		} else {
			updateDom(isExpanded);
		}
	};

	const updateDom = (isExpanded) => {
		if (dropdownToggle) {
			dropdownToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
		}
		const menuElement = qs(node, '.dropdown-menu');
		if (menuElement) {
			if (isExpanded) {
				menuElement.setAttribute('role', 'menu');
				addClass(menuElement, 'show');
				if (PopperClass) {
					new PopperClass(dropdownToggle, menuElement);
				}
			} else {
				removeClass(menuElement, 'show');
			}
		}
	};

	const onKeyDown = (e) => {
		const target = e.target;
		const which = e.which;
		let focusIncrement = which == 40 ? 1 : which == 38 ? -1 : 0;

		if (!focusIncrement) {
			return;
		}

		const items = Array.from(qsa(node, '.dropdown-item'));
		if (containsClass(target, 'dropdown-toggle') || containsClass(target, 'dropdown-control')) {
			if (_isExpanded(node)) {
				focusIndex = focusIndex == null ? 0 : focusIndex + focusIncrement;
			} else {
				toggleExpanded(true);
				focusIndex = null;
			}
		}

		if (containsClass(target, 'dropdown-item')) {
			focusIndex = items.indexOf(target);
			focusIndex += focusIncrement;
		}

		if (focusIndex != null) {
			const itemLength = items.length;
			if (itemLength) {
				if (focusIndex < 0) {
					focusIndex = 0;
				} else if (focusIndex >= itemLength) {
					focusIndex = itemLength - 1;
				}
			} else {
				focusIndex = null;
			}

			if (focusIndex != null) {
				items[focusIndex].focus();
			}
		}

	}

	const clickDestroy = addEvent(node, 'click', dropdownClick);

	const focusInDestroy = addEvent(node, 'focusin', (e) => {
		if (!isIn) {
			destroyEvents();
			eventsRemoval.push(addEvent(node, 'keydown', onKeyDown))
		}
		isIn = true;
	});

	const focusOutDestroy = addEvent(node, 'focusout', (e) => {
		if (!contains(node, e.relatedTarget)) {
			isIn = false;
			destroyEvents();
			toggleExpanded(false);
		}
	});

	updateDom(isExpandedInit, toggleExpanded);
	return {
		update: ({isExpanded}) => {
			updateDom(isExpanded, toggleExpanded);
		},
		destroy: () => {
			destroyEvents();
			clickDestroy();
			focusInDestroy();
			focusOutDestroy();
		}
	};
};
