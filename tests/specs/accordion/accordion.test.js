
export async function checkOnlyOnePanelOpen(I) {
	await I.openThePage('/en/documentation/accordion');
	await I.workWithAccordion(1);
	await I.checkExpandedPanels(1);
	await I.clickOnHeader(1);
	await I.checkExpandedPanels(1);
	await I.clickOnHeader(0);
	await I.checkExpandedPanels(1);
}

export async function checkMultiplePanelsOpen(I) {
	await I.openThePage('/en/documentation/accordion');
	await I.workWithAccordion(2);
	await I.checkExpandedPanels(1);
	await I.clickOnHeader(1);
	await I.checkExpandedPanels(2);
	await I.clickOnHeader(0);
	await I.checkExpandedPanels(1);
}