import {Selector} from "testcafe";

export class AccordionPage {

	accordionElement;

	constructor({selector = '.accordion', index = 0}) {
		this.accordionElement = Selector(selector).nth(index);
	}

	getAccordion() {
		return accordionElement;
	}

	getHeaders() {
		return this.accordionElement.find('.card-header .btn');
	}

	getHeader(index) {
		return this.getHeaders().nth(index);
	}

	getExpandedHeaders() {
		return this.getHeaders().filter('[aria-expanded="true"]');
	}

	getCollapsedHeaders() {
		return this.getHeaders().filter('[aria-expanded="false"]');
	}


}