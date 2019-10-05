<style>
    .sidebar {
        max-width: 200px;
    }
</style>

<script>

  import { onMount, onDestroy } from 'svelte';
  import { location } from '../../services/router.js';

  import Alert from './alert/Alert.svelte';
  import Accordion from './accordion/Accordion.svelte';
  import Collapse from './collapse/Collapse.svelte';
  import Dropdown from './dropdown/Dropdown.svelte';
  import Modal from './modal/Modal.svelte';

  const menu = [
      {
        id: 'accordion',
        label: 'Accordion',
        component: Accordion
      },
      {
        id: 'alert',
        label: 'Alert',
        component: Alert
      },
      {
        id: 'button',
        label: 'Button',
        component: ''
      },
      {
        id: 'collapse',
        label: 'Collapse',
        component: Collapse
      },
      {
        id: 'dropdown',
        label: 'Dropdown',
        component: Dropdown
      },
      {
        id: 'modal',
        label: 'Modal',
        component: Modal
      }
  ];


  const getItem = (id) => {
    return menu.filter((item) => {
      return item.id === id;
    })[0];
  }

  let activeMenu;

	onMount(() => {
		console.log('Document on mount');
	})

  const routerRegExp = /([^\/]+)$/gi;
  $: {
      const matches = $location.match(routerRegExp);
      activeMenu = getItem(matches && matches[0] ?matches[0] : 'alert');
  }

</script>
<div class="row">
    <div class="sidebar col">
        <ul class="nav flex-column">
            {#each menu as menuItem}
            <li class="nav-item" class:active="{activeMenu === menuItem.id}">
                <a class="nav-link" href="/documentation/{menuItem.id}">{menuItem.label}</a>
            </li>
            {/each}
        </ul>
    </div>
    <div class="col">
        <svelte:component this={activeMenu.component}></svelte:component>
    </div>
</div>