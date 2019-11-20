<script>
    import Dropdown from 'svelte-bs/dropdown/Dropdown.svelte';
</script>

<h1>Dropdown</h1>
<Dropdown targetClassname="btn-primary">
	<div slot="menu" aria-labelledby="dropdownMenuButton">
		<a class="dropdown-item" href="/">Action</a>
		<a class="dropdown-item" href="/">Another action</a>
		<a class="dropdown-item" href="/">Something else here</a>
	</div>
</Dropdown>

