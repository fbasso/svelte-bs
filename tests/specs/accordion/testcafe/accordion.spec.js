import { config } from '../../../testcafe.config';
import { AccordionPage } from './accordion.po';
import * as tests from '../accordion.test';

class ActionHandler {

	t;
	accordion = new AccordionPage();

	constructor(t) {
		this.t = t;
	}

	async openThePage(url) {
		await this.t.navigateTo(`${config.baseUrl}${url}`);
	}

	workWithAccordion(index) {
		this.accordion.changeAccordion({index});
	}


	async clickOnHeader(index) {
		await this.t.click(this.accordion.getHeader(index));
	}

	async checkExpandedPanels(expectedNumber) {
		const expandedHeaders = this.accordion.getExpandedHeaders();
		await this.t.expect(expandedHeaders.count).eql(expectedNumber);
	}

}

fixture `Accordion`.page(`${config.baseUrl}`);

test('should have only one panel open', async t => {
	const actionHandler = new ActionHandler(t);
	await tests.checkOnlyOnePanelOpen(actionHandler);
});

test('can have multiple panel open', async t => {
	const actionHandler = new ActionHandler(t);
	await tests.checkMultiplePanelsOpen(actionHandler);
});


