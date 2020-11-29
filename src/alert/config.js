
import {writable} from "svelte/store";

export let config = writable({
    type: 'primary',
    enableAnimation: true,
    dismissible: true
});
