
export class AccordionElement {

	selector = null;
	index = null;

	constructor({selector = '.accordion', index = 0}) {
		this.selector = selector;
		this.index = index;
	}

	getAccordion() {
		return cy.get(this.selector).eq(this.index);
	}

	getHeaders() {
		return this.getAccordion().find('.card-header .btn');
	}

	getHeader(index) {
		return this.getHeaders().eq(index);
	}

	getExpandedHeaders() {
		return this.getHeaders().filter('[aria-expanded="true"]');
	}

	getCollapsedHeaders() {
		return this.getHeaders().filter('[aria-expanded="false"]');
	}

}