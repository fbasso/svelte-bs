<script>
    import Modal from 'sveltrap/modal/Modal.svelte';

    let isOpen = false;
    const open = () => {
        isOpen = true;
    }

    const close = () => {
        isOpen = false;
    }


</script>

<h1>Modal</h1>

<button class="btn btn-primary" on:click={open}>Open modal</button>
{isOpen}
<Modal isVisible={isOpen} on:dismiss={close} classname="modal-lg">
    <!-- <div slot="header">
        <h5 slot="title">This is my modal title</h5>
    </div> -->
    <h5 slot="title">This is my modal title</h5>
    This is my modal content
    <div slot="footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={close}>Close</button>
        <button type="button" class="btn btn-primary" on:click={close}>Save changes</button>
    </div>
</Modal>
