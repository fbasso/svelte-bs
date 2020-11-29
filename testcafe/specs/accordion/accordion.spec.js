import {Selector} from 'testcafe';
import {config} from '../../config.js';
import {AccordionPage} from './accordion.po.js';

fixture `Accordion`.page(`${config.baseUrl}/en/documentation/accordion`);


test('should have only one panel open', async t => {
	const accordion = new AccordionPage({index: 1});
	const expandedHeaders = accordion.getExpandedHeaders();
	await t.expect(expandedHeaders.count).eql(1);
	await t.click(accordion.getHeader(1));
	await t.expect(expandedHeaders.count).eql(1);
});

test('can have multiple panel open', async t => {
	const accordion = new AccordionPage({index: 2});
	const expandedHeaders = accordion.getExpandedHeaders();
	await t.expect(expandedHeaders.count).eql(1);
	await t.click(accordion.getHeader(1));
	await t.expect(expandedHeaders.count).eql(2);
	await t.click(accordion.getHeader(0));
	await t.expect(expandedHeaders.count).eql(1);

  });
