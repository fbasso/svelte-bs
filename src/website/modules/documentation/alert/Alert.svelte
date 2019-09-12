<script>
    import Alert from 'bootstrap/alert/Alert';

    let isVisible = true;
    const close = () => {
        console.log('close');
        isVisible = false;
    }

</script>

<h1>Alert types</h1>

<Alert>
    A simple primary alert—check it out!
</Alert>

<Alert type="secondary">
  A simple secondary alert—check it out!
</Alert>
<Alert type="success">
  A simple success alert—check it out!
</Alert>
<Alert type="danger">
  A simple danger alert—check it out!
</Alert>
<Alert type="warning">
  A simple warning alert—check it out!
</Alert>
<Alert type="info">
  A simple info alert—check it out!
</Alert>
<Alert type="light">
  A simple light alert—check it out!
</Alert>
<Alert type="dark">
  A simple dark alert—check it out!
</Alert>

<h1>Alert types</h1>
<button type="button" class="btn btn-primary" on:click={() => isVisible = !isVisible}>Toggle alert</button>
{isVisible}
<Alert className="alert-custom" on:dismiss={() => {isVisible = false}} {isVisible}>
    A simple primary alert—check it out!
</Alert>
