<script>

	import { onMount, onDestroy } from 'svelte';
	import { location } from './services/router.js';

	import Documentation from './pages/documentation/Documentation.svelte';
	import Examples from './pages/examples/Examples.svelte';

	const routerRegExp = /([^\/]+)/gi;

	const components = {
		documentation: {
			label: 'Documentation',
			component: Documentation
		},
		examples: {
			label: 'Examples',
			component: Examples
		}
	}
	let activeComponent;

	$: {
		const matches = $location.match(routerRegExp);
		// console.log('Route change', $location, matches && matches[0] ? matches[0] : 'operations');
		activeComponent = components[matches && matches[0] ? matches[0] : 'documentation'];
	}

</script>

<style>
</style>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<a class="navbar-brand" href="/" aria-label="Bootstrap">Svelte Bootstrap</a>
	<div class="navbar-nav-scroll">
		<ul class="navbar-nav bd-navbar-nav flex-row">
			<li class="nav-item">
				<a class="nav-link active" href="/documentation/">Documentation</a>
			</li>
			<li class="nav-item">
				<a class="nav-link " href="/examples/">Examples</a>
			</li>
		</ul>
	</div>
</nav>

<svelte:component this={activeComponent.component}></svelte:component>