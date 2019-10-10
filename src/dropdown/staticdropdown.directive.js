
const _isExpanded = (node) => {
	return node.classList.contains('show');
};

export const staticDropdown = (node, params) => {
	return dropdownDirective(node, null, params);
};

export const dropdownDirective = (node, PopperClass, {isExpandedInit, toggleExpanded} = {isExpanded: false, toggleExpanded: null}) => {
	const dropdownToggle = node.querySelector('.dropdown-toggle');

	const closeDropdown = (e) => {
		if (toggleExpanded) {
			toggleExpanded(false);
		} else {
			updateDom(node, false);
		}
		removeGlobalEvents();
	};

	const addGlobalEvents = () => {
		removeGlobalEvents();
		setTimeout(() => {
			const body = document.body;
			body.addEventListener('click', closeDropdown);
		}, 0);
	};

	const removeGlobalEvents = () => {
		const body = document.body;
		body.removeEventListener('click', closeDropdown);
	};


	const updateDom = (isExpanded) => {
		dropdownToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
		const menuElement = node.querySelector('.dropdown-menu') || node.querySelector('[slot="menu"]');
		if (menuElement) {
			const classListMenu = menuElement.classList;
			if (isExpanded) {
				menuElement.setAttribute('role', 'menu');
				classListMenu.add('dropdown-menu');
				classListMenu.add('show');
				addGlobalEvents();
				if (PopperClass) {
					new PopperClass(dropdownToggle, menuElement);
				}
			} else {
				classListMenu.remove('show');
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

	dropdownToggle.addEventListener('click', buttonClick);
	dropdownToggle.setAttribute('aria-haspopup', 'true');
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
