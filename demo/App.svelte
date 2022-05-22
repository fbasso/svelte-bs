<script lang="ts">

	import {onMount, onDestroy} from 'svelte';
	import {location, lang} from './services/router';
	import {locales} from './services/localization';

	import DropdownMenu from '../src/dropdown/DropdownMenu.svelte';

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
	let language = 'Change language';

	$: pathname = $location.pathname;

	$: {
		const matches = pathname.match(routerRegExp);
		// console.log('Route change', $location, matches && matches[0] ? matches[0] : 'operations');
		activeComponent = components[matches && matches[0] ? matches[0] : 'documentation'];
	}

	async function changeLanguage(currentLang) {
		let response = {default: {}};
		switch (currentLang) {
			case 'fr':
				response = await import('./locales/locales.fr');
				break;

			default:
				response = await import('./locales/locales.en');
				break;
		}
		locales.set(response.default)
	}

	$: changeLanguage($lang);

</script>

<style>
</style>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<a class="navbar-brand" href="/" aria-label="Bootstrap">Svelte Bootstrap</a>
	<div class="navbar-nav-scroll">
		<ul class="navbar-nav bd-navbar-nav flex-row">
			<li class="nav-item">
				<a class="nav-link active" href="/{$lang}/documentation/">Documentation</a>
			</li>
			<li class="nav-item">
				<a class="nav-link " href="/{$lang}/examples/">Examples</a>
			</li>
			<DropdownMenu title={language}>
				<div class="dropdown-menu" aria-labelledby="navbarDropdown">
					<a class="dropdown-item" href="en/{pathname}">English</a>
					<a class="dropdown-item" href="fr/{pathname}">French</a>
				</div>
			</DropdownMenu>
		</ul>
	</div>
</nav>

<svelte:component this={activeComponent.component}></svelte:component>