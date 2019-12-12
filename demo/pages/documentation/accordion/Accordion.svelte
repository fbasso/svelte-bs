<script>
	import Collapse from 'sveltrap/collapse/Collapse.svelte';
	import { collapse } from 'sveltrap/collapse/collapse.service.js';

	import Accordion from 'sveltrap/accordion/Accordion.svelte';
	import Panel from 'sveltrap/accordion/Panel.svelte';

	import { locales, getLocales, replace } from '../../../services/localization.js';

	$: ({directiveTitle, collapsibleGroup, componentTitle, openedAccordion, panel } = getLocales($locales, 'accordion'));

	const expandedAccordions = [true, false, false];

	let openedPanels = ['pc1'];
	let openedPanels2 = ['pc2'];

	const panelContent = `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.`;

	const toggleAccordion = (i) => {
		const newValue = !expandedAccordions[i];
		expandedAccordions.fill(false);
		expandedAccordions[i] = newValue;
	}

</script>

<h1>Accordion</h1>

<h2>{directiveTitle}</h2>

<div class="accordion">

  <div class="card">
    <div class="card-header">
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" on:click={() => {toggleAccordion(0)}} use:collapse={{collapseId: 'p0', isExpanded: expandedAccordions[0]}}>
		  {replace(collapsibleGroup, {group: 1})}
        </button>
      </h2>
    </div>
	<Collapse bind:isExpanded={expandedAccordions[0]}>
		<div class="card-body">{panelContent}</div>
	</Collapse>
  </div>

  <div class="card">
    <div class="card-header">
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" on:click={() => {toggleAccordion(1)}} use:collapse={{collapseId: 'p1', isExpanded: expandedAccordions[1]}}>
          {replace(collapsibleGroup, {group: 2})}
        </button>
      </h2>
    </div>
	<Collapse bind:isExpanded={expandedAccordions[1]}>
		<div class="card-body">{panelContent}</div>
	</Collapse>
  </div>

  <div class="card">
    <div class="card-header">
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" on:click={() => {toggleAccordion(2)}} use:collapse={{collapseId: 'p2', isExpanded: expandedAccordions[2]}}>
          {replace(collapsibleGroup, {group: 3})}
        </button>
      </h2>
    </div>
	<Collapse bind:isExpanded={expandedAccordions[2]}>
		<div class="card-body">{panelContent}</div>
	</Collapse>
  </div>

</div>

<h2>{componentTitle}</h2>

<div class="mb-3">
	<strong>{openedAccordion} : {openedPanels}</strong>
</div>
<div class="mb-3">
	<Accordion bind:expanded={openedPanels} multiple="false">
		<Panel id="pc1" title={replace(panel, [1])}>
			{panelContent}
		</Panel>
		<Panel title={replace(panel, [2])}>
			{panelContent}
		</Panel>
		<Panel title={replace(panel, [3])}>
			{panelContent}
		</Panel>
	</Accordion>

	<div class="mt-5 mb-3">
		<strong>{openedAccordion} : {openedPanels2}</strong>
	</div>

	<Accordion bind:expanded={openedPanels2} multiple="true">
		<Panel id="pc2" title={replace(panel, [1])}>
			{panelContent}
		</Panel>
		<Panel title={replace(panel, [2])}>
			{panelContent}
		</Panel>
		<Panel>
			<h3 slot="title">{replace(panel, [3])}</h3>
			{panelContent}
		</Panel>
	</Accordion>
</div>