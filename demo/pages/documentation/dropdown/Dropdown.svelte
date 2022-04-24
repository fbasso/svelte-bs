<script>
    import Dropdown from '#sveltrap/dropdown/Dropdown.svelte';
    import StaticDropdown from '#sveltrap/dropdown/StaticDropdown.svelte';

	let dropdownDef = {
		buttonText: 'Dropdown button',
		isExpanded: false,
	}

	let staticDropdownDef = {
		buttonText: 'Static dropdown button',
		isExpanded: false,
	}

	function changeButtonText({target}, props) {
		if (/a/i.test(target.tagName)) {
			props.buttonText = target.innerText;
		}
		props.isExpanded = false;

		// Update references
		dropdownDef = dropdownDef;
		staticDropdownDef = staticDropdownDef;
	}

</script>


<h1>Dropdown</h1>
<Dropdown bind:isExpanded={dropdownDef.isExpanded}>
	<button class="btn btn-primary dropdown-toggle" type="button">
		{dropdownDef.buttonText}
	</button>
	<div class="dropdown-menu" on:click|preventDefault|stopPropagation={(e) =>{changeButtonText(e, dropdownDef)}}>
		<a class="dropdown-item" href="/">Action</a>
		<a class="dropdown-item" href="/">Another action</a>
		<a class="dropdown-item" href="/">Something else here</a>
	</div>
</Dropdown>

<StaticDropdown bind:isExpanded={staticDropdownDef.isExpanded}>
	<button class="btn btn-primary dropdown-toggle" type="button">
		{staticDropdownDef.buttonText}
	</button>
	<div class="dropdown-menu" on:click|preventDefault|stopPropagation={(e) =>{changeButtonText(e, staticDropdownDef)}}>
		<a class="dropdown-item" href="/">Action</a>
		<a class="dropdown-item" href="/">Another action</a>
		<a class="dropdown-item" href="/">Something else here</a>
	</div>
</StaticDropdown>

