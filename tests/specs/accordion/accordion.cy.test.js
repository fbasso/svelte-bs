
export function checkOnlyOnePanelOpen(I) {
	I.openThePage('/en/documentation/accordion');
	I.workWithAccordion(1);
	I.checkExpandedPanels(1);
	I.clickOnHeader(1);
	I.checkExpandedPanels(1);
	I.clickOnHeader(0);
	I.checkExpandedPanels(1);
}

export function checkMultiplePanelsOpen(I) {
	I.openThePage('/en/documentation/accordion');
	I.workWithAccordion(2);
	I.checkExpandedPanels(1);
	I.clickOnHeader(1);
	I.checkExpandedPanels(2);
	I.clickOnHeader(0);
	I.checkExpandedPanels(1);
}