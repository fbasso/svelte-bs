import { addClass, removeClass, containsClass } from './dom.js';


export const transitionTime = (node) => {
    const styles = window.getComputedStyle(node);
    const delay = parseFloat(styles.transitionDelay || 0) * 1000;
    const duration = parseFloat(styles.transitionDuration || 0) * 1000;

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

	let heightInit;
    let heightFrom;
    let heightTo;
    let height;

    if (containsClass(node, collapsingClass)) {
      // Animation is running, revert it !
      heightInit = node.getBoundingClientRect().height + 'px';
      heightFrom = node.getAttribute(dataHeightTo);
      heightTo = node.getAttribute(dataHeightFrom);
    } else {
      // Animation not running
      const isShown = direction === 'hide';

      // Reset the classes, for example if animation has been cancelled before
	  addClass(node, collapseClass);
	  removeClass(node, collapsingClass);

      // First set and store the height required for the animation
      if (!isShown) {
		addClass(node, showClass);
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
	removeClass(node, [collapseClass, collapsingClass, showClass])

    reflow(node);

	addClass(node, collapsingClass);

    heightTo = node.getAttribute(dataHeightTo);
    height = node.getBoundingClientRect().height + 'px';
    if (heightTo === height) {
      return 0;  // feedback that the animation cannot be done
    } else {
      node.style.height = node.getAttribute(dataHeightTo);
	}

	const timing = transitionTime(node);
	setTimeout(() => {
		if (node.getBoundingClientRect().height) {
			removeClass(node, collapsingClass);
			addClass(node, [collapseClass, showClass]);
		}
	}, timing.delay + timing.duration + 10);

    return timing;

}