<script>

  import { onMount, onDestroy } from 'svelte';
  import { location } from './services/router.js';

  import Documentation from './modules/documentation/Documentation.svelte';
	import Examples from './modules/examples/Examples.svelte';

  const routerRegExp = /([^\/]+)/gi;
  let componentName;

  $: {
    console.log('Route change', $location);
      const matches = $location.match(routerRegExp);
      if (matches && matches[0]) {
        componentName = matches[0];
      } else {
        componentName = 'documentation';
      }
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

{#if componentName == "documentation"}
<Documentation></Documentation>
{:else if componentName == "examples"}
<Examples></Examples>
{/if}