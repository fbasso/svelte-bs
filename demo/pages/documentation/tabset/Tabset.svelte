<script>
	import Panel from 'sveltrap/tabset/Panel.svelte';
	import Tabset from 'sveltrap/tabset/Tabset.svelte';
	import Tab from 'sveltrap/tabset/Tab.svelte';

	const panelContent0 = `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.`;
	const panelContent1 = `Profile page`;
	const panelContent2 = `Contact page<br><br>Second line`;

	let selectedId = 'home';
	const selectTab = (e) => {
		selectedId = e.target.getAttribute('href').substr(1);
	};

	let selectedIdInWidget;
</script>

<h1>Tabs</h1>

<h2>Minimal example</h2>
<Tabset>
	<Panel title="First panel">{panelContent0}</Panel>
	<Panel title="Second panel">{panelContent1}</Panel>
	<Panel title="Third panel">{@html panelContent2}</Panel>
</Tabset>

<h2>Customized example</h2>

<Tabset selectedId={selectedId}>
	<li slot="nav_item-template" let:panelId let:label>
		<a  href={'#' + panelId}>{label}</a>
	</li>
	<div slot="tabs">
		<a class="nav-item nav-link" href="#home">Home</a>
		<a class="nav-item nav-link" href="#profile">Profile</a>
		<a class="nav-item nav-link" href="#contact">Contact</a>
	</div>
	<div class="tab-content">
		<Panel id="home">{panelContent0}</Panel>
		<Panel id="profile">{panelContent1}</Panel>
		<Panel id="contact">{@html panelContent2}</Panel>
	</div>
</Tabset>

