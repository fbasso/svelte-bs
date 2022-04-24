<script>
    import Alert from '#sveltrap/alert/Alert.svelte';

    let isVisible = true;
    const close = () => {
        isVisible = false;
    }

	let alerts = [
		{id: 'none', isVisible: true},
		{id: 'secondary', isVisible: true, type: 'secondary'},
		{id: 'success', isVisible: true, type: 'success'},
		{id: 'danger', isVisible: true, type: 'danger'},
		{id: 'warning', isVisible: true, type: 'warning'},
		{id: 'info', isVisible: true, type: 'info'},
		{id: 'light', isVisible: true, type: 'light'},
		{id: 'dark', isVisible: true, type: 'dark'},
	];

	const toggleAlert = (alert) => {
		alert.isVisible = !alert.isVisible;
		alerts = [...alerts];
	};


</script>

<h1>Alert types</h1>

{#each alerts as alertDef (alertDef.id)}
<Alert type={alertDef.type} isVisible={alertDef.isVisible} on:dismiss={() => {toggleAlert(alertDef)}}>
    An alert of type {alertDef.type}
</Alert>
{/each}

<h1>Alert api</h1>
<button type="button" class="btn btn-primary" on:click={() => isVisible = !isVisible}>Toggle alert</button>
{isVisible}
<Alert classname="alert-custom" on:dismiss={() => {isVisible = false}} {isVisible}>
    A simple primary alert—check it out!
</Alert>
