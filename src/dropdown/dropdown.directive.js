
import Popper from 'popper.js';
import { dropdownDirective } from './staticdropdown.directive.js';

export const dropdown = (node, params) => {
	return dropdownDirective(node, Popper, params);
};
