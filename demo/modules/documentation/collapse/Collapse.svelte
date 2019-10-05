<script>
    import Collapse from 'svelte-bs/collapse/Collapse';
    import { collapse } from 'svelte-bs/collapse/collapse.service';

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

<Collapse isExpanded={isExpanded} id={collapseId}>
	<div class="card card-body">
		My collapse content
	</div>
</Collapse>



