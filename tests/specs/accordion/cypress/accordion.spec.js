/// <reference types="Cypress" />

import { AccordionPage } from './accordion.po.js';
import * as tests from '../accordion.cy.test';

class ActionHandler {

	accordion = new AccordionPage();

	openThePage(url) {
		cy.visit(url);
	}

	workWithAccordion(index) {
		this.accordion.changeAccordion({index});
	}


	clickOnHeader(index) {
		this.accordion.getHeader(index).click();
	}

	checkExpandedPanels(expectedNumber) {
		this.accordion.getExpandedHeaders().should('have.length', expectedNumber);
	}

}

describe('Accordion', () => {
	it('should have only one panel open', () => {
		const actionHandler = new ActionHandler();
		tests.checkOnlyOnePanelOpen(actionHandler);
	});

	it('can have multiple panel open', () => {
		const actionHandler = new ActionHandler();
		tests.checkMultiplePanelsOpen(actionHandler);
	});

})

