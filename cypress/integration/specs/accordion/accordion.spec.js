/// <reference types="Cypress" />

import { AccordionElement } from './accordion.po.js';

context('Accordion', () => {
  beforeEach(() => {
    cy.visit('/en/documentation/accordion');
  })

  it('should have only one panel open', () => {
	const accordion = new AccordionElement({index: 1});
	accordion.getExpandedHeaders().should('have.length', 1);
	accordion.getHeader(1).click();
	accordion.getExpandedHeaders().should('have.length', 1);
  });

  it('can have multiple panel open', () => {

	const accordion = new AccordionElement({index: 2});
	accordion.getExpandedHeaders().should('have.length', 1);
	accordion.getHeader(1).click();
	accordion.getExpandedHeaders().should('have.length', 2);
	accordion.getHeader(0).click();
	accordion.getExpandedHeaders().should('have.length', 1);
  });

})

