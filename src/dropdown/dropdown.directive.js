
import Popper from 'popper.js';

const getToggleElement = (node) => {
	return node.querySelector('.dropdown-toggle');
};

const updateDom = (node, isExpanded) => {
	const toggleDropdown = getToggleElement(node);
	toggleDropdown.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
	if (isExpanded) {
		const menuElement = node.querySelector('[slot="menu"]');
		const classListMenu = menuElement.classList;
		classListMenu.add('dropdown-menu');
		classListMenu.add('show');

		new Popper(toggleDropdown, menuElement);
	}
};


export const dropdown = (node, {isExpandedInit}) => {
	const dropdownToggle = getToggleElement(node);
	dropdownToggle.setAttribute('aria-haspopup', 'true');
	updateDom(node, isExpandedInit);

	return {
		update: ({isExpanded}) => {updateDom(node, isExpanded);}
	};
};
