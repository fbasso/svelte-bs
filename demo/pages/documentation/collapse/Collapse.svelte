<script>
    import Collapse from '@sveltrap/collapse/Collapse.svelte';
    import { collapse } from '@sveltrap/collapse/collapse.service.js';

    let isExpanded = true;

	const collapseId = 'collapseId';

	const onClick = (e) => {
		isExpanded = !isExpanded;
		e.preventDefault();
	}

</script>

<h1>Collapse example</h1>

<button use:collapse={{collapseId, isExpanded}} class="btn btn-primary" on:click={onClick}>Collapse element is {isExpanded ? 'visible' : 'hidden'}</button>
<a use:collapse={{collapseId, isExpanded}} href="nope" class="btn btn-primary" on:click={onClick} style="margin-bottom: 8px;">Collapse element is {isExpanded ? 'visible' : 'hidden'}</a>
<button class="btn btn-primary" on:click={onClick}>Toggle by unlinked button</button>

<Collapse isExpanded={isExpanded}>
	<div class="card card-body">
		My collapse content
	</div>
</Collapse>



