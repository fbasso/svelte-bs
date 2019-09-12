<script>
    import Modal from 'bootstrap/modal/Modal';

    let isOpen = false;
    const open = () => {
        console.log('open');
        isOpen = true;
    }

    const close = () => {
        console.log('close');
        isOpen = false;
    }


</script>

<h1>Modal</h1>

<button class="btn btn-primary" on:click={open}>Open modal</button>
{isOpen}
<Modal isVisible={isOpen} on:dismiss={close}>
    This is my modal content
    <div slot="footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={close}>Close</button>
        <button type="button" class="btn btn-primary" on:click={close}>Save changes</button>
    </div>
</Modal>
