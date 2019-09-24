<script>
    import Collapse from 'bootstrap/collapse/Collapse';
    import { collapse } from 'bootstrap/collapse/collapse.service';

    let isVisible = true;
    let isVisibleOther = true;

	const collapseId = 'collapseId';

	const onClick = (e) => {
		isVisible = !isVisible;
		e.preventDefault();
	}

</script>

<h1>Collapse example</h1>

<button use:collapse={{collapseId, isVisible}} class="btn btn-primary" on:click={onClick}>Collapse element is {isVisible ? 'visible' : 'hidden'}</button>
<a use:collapse={{collapseId, isVisible}} href="nope" class="btn btn-primary" on:click={onClick} style="margin-bottom: 8px;">Collapse element is {isVisible ? 'visible' : 'hidden'}</a>
<button class="btn btn-primary" on:click={onClick}>Toggle by unlinked button</button>

<Collapse isVisible={isVisible} id={collapseId}>
	<div class="card card-body">
		My collapse content
	</div>
</Collapse>



