


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

const collapseClass = 'collapse';
const collapsingClass = 'collapsing';
const showClass = 'show';
const dataHeightFrom = 'data-height-from';
const dataHeightTo = 'data-height-to';

export function toggleCollapse(node, direction) {
	const classList = node.classList;

	let heightInit;
    let heightFrom;
    let heightTo;
    let height;

    if (classList.contains(collapsingClass)) {
      // Animation is running, revert it !
      heightInit = node.getBoundingClientRect().height + 'px';
      heightFrom = node.getAttribute(dataHeightTo);
      heightTo = node.getAttribute(dataHeightFrom);
    } else {
      // Animation not running
      const isShown = direction === 'hide';

      // Reset the classes, for example if animation has been cancelled before
      classList.add(collapseClass);
      classList.remove(collapsingClass);

      // First set and store the height required for the animation
      if (!isShown) {
        classList.add(showClass);
      }

      node.style.height = '';

      height = node.getBoundingClientRect().height + 'px';

      if (isShown) {
        heightFrom = height;
        heightTo = '0px';
      } else {
        heightFrom = '0px';
        heightTo = height;
      }
      heightInit = heightFrom;
    }

    // set the height before the animation
    node.style.height = heightInit;
    node.setAttribute(dataHeightFrom, heightFrom);
    node.setAttribute(dataHeightTo, heightTo);

    // Remove the collapse classes to let the nbgAnimationEngine works by itself
    classList.remove(collapseClass);
    classList.remove(collapsingClass);
    classList.remove(showClass);

    reflow(node);

    classList.add(collapsingClass);

    heightTo = node.getAttribute(dataHeightTo);
    height = node.getBoundingClientRect().height + 'px';
    if (heightTo === height) {
      return 0;  // feedback that the animation cannot be done
    } else {
      node.style.height = node.getAttribute(dataHeightTo);
    }
    return transitionTime(node);

}