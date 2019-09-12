


export const transitionTime = (node) => {
    const styles = window.getComputedStyle(node);
    const delay = parseFloat(styles['transition'] || 0) * 1000;
    const duration = parseFloat(styles['transitionDuration'] || 0) * 1000;

    return {
        delay,
        duration
    };

}

export function reflow(node) {
    return (node || document.body).offsetHeight;
}