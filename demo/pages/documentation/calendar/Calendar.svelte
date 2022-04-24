<script>
    import Calendar from '#sveltrap/calendar/Calendar.svelte';

	let props = {
		startDate: '2020-01-01',
		rows: 1,
		cols: 1,
		locale: 'en-GB',
		navigation: 'select',
		styles: [],
	};

	let selectedDate;

	function change({target}, prop) {
		props[prop] = target.value;
	}

	function onDateSelect({detail}) {
		selectedDate = detail;
		const range = detail.range;
		if (range.length !== 0) {
			props.styles = [{
				date1: range[0],
				date2: range[1],
				className: 'bg-primary text-light',
			}];
		} else {
			props.styles = [];
		}
	}

</script>

<h1>Calendar</h1>

<h2>Options</h2>
<div class="form form-inline">
	<div class="input-group mb-2 me-2">
		<label class="me-2" for="locale">Locale</label>
		<input type="text" class="form-control" id="locale" value={props.locale} on:change={(e) => change(e, 'locale')}>
	</div>
	<div class="input-group mb-2 me-2">
		<label class="me-2" for="startDate">First date</label>
		<input type="text" class="form-control" id="startDate" value={props.startDate} on:change={(e) => change(e, 'startDate')}>
	</div>
	<div class="input-group mb-2 me-2">
		<label class="me-2" for="cols">Cols</label>
		<input type="text" class="form-control" id="cols" value={props.cols} on:change={(e) => change(e, 'cols')}>
	</div>
	<div class="input-group mb-2 me-2">
		<label class="me-2" for="rows">Rows</label>
		<input type="text" class="form-control" id="rows" value={props.rows} on:change={(e) => change(e, 'rows')}>
	</div>
	<div class="input-group mb-2 me-2">
		<label class="me-2" for="navigation">Navigation</label>
		<select type="text" class="form-control" id="navigation" value={props.navigation} on:change={(e) => change(e, 'navigation')}>
			<option value="select">select</option>
			<option value="arrows">arrows</option>
			<option value="none">none</option>
		</select>
	</div>
</div>

<h2>Calendar</h2>
<Calendar {...props} on:dateselect={onDateSelect} />
<div>
	Selected date : {JSON.stringify(selectedDate)}
</div>