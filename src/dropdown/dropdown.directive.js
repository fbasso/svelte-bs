import Popper from 'popper.js';
import { qs, addEvent, addClass, removeClass, containsClass } from '../util/dom.js';

const _isExpanded = (node) => {
	return containsClass(node, 'show');
};

export const dropdown = (node, params) => {
	return dropdownDirective(node, Popper, params);
};

export const staticDropdown = (node, params) => {
	return dropdownDirective(node, null, params);
};

export const dropdownDirective = (node, PopperClass, {isExpandedInit, toggleExpanded} = {isExpanded: false, toggleExpanded: null}) => {
	const dropdownToggle = qs('.dropdown-toggle', node);

	const closeDropdown = (_e) => {
		if (toggleExpanded) {
			toggleExpanded(false);
		} else {
			updateDom(node, false);
		}
		removeGlobalEvents();
	};

	let destroyFn;
	const addGlobalEvents = () => {
		removeGlobalEvents();
		setTimeout(() => {
			const body = document.body;
			destroyFn = addEvent(body, 'click', closeDropdown);
		}, 0);
	};

	const removeGlobalEvents = () => {
		if (destroyFn) {
			destroyFn();
		}
		destroyFn = null;
	};


	const updateDom = (isExpanded) => {
		if (dropdownToggle) {
			dropdownToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
		}
		const menuElement = qs('.dropdown-menu', node) || qs('[slot="menu"]', node);
		if (menuElement) {
			if (isExpanded) {
				menuElement.setAttribute('role', 'menu');
				addClass(menuElement, 'dropdown-menu');
				addClass(menuElement, 'show');
				addGlobalEvents();
				if (PopperClass) {
					new PopperClass(dropdownToggle, menuElement);
				}
			} else {
				removeClass(menuElement, 'show');
				removeGlobalEvents();
			}
		}
	};

	const buttonClick = (e) => {
		const isExpanded = !_isExpanded(node);
		if (toggleExpanded) {
			toggleExpanded(isExpanded);
		} else {
			updateDom(isExpanded);
		}
		e.preventDefault();
	};

	if (dropdownToggle) {
		dropdownToggle.addEventListener('click', buttonClick);
		dropdownToggle.setAttribute('aria-haspopup', 'true');
	}
	updateDom(isExpandedInit, toggleExpanded);

	return {
		update: ({isExpanded}) => {
			updateDom(isExpanded, toggleExpanded);
		},
		destroy: () => {
			dropdownToggle.removeEventListener('click', buttonClick);
			removeGlobalEvents();
		}
	};
};
