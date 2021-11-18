import {createDropdownListModel} from './dropdown.js';

export function createAutocompleteModel(userValue) {

	const dropdownList = createDropdownListModel();
	const {isOpen} = dropdownList;

	const autocompleteList = derived([userValue])

	userValue.subscribe() {

	}

	return {
		...dropdownList,
	};

}