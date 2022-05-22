import {
	popperGenerator,
	defaultModifiers,
 } from '@popperjs/core/lib/popper-lite.js';
  import flip from '@popperjs/core/lib/modifiers/flip.js';
  import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';

if (!window.process) {
	window.process = {env: __dev__ ? 'dev' : 'production'};
}

const createPopper = popperGenerator({
	defaultModifiers: [...defaultModifiers, flip, preventOverflow],
});

export function openPopper(reference, popper, placement = 'bottom-start') {
	const popperInstance = createPopper(reference, popper, {
		placement,
		modifiers: [
			// {
			// 	name: "offset",
			// 	enabled: true,
			// 	options: {
			// 		// offset: ({ placement, reference, popper }) => {
			// 		offset: () => {
			// 			return baseClass === "bs-popover" ? [0, 12] : [];
			// 		},
			// 	},
			// },
			{
				name: "flip",
				// options: {
				// 	fallbackPlacements: popperPlacements,
				// },
			},
			// {
			// 	name: "preventOverflow",
			// },
		],
	});

	return () => popperInstance.destroy();
}

/*
import {
  popperGenerator,
  defaultModifiers,
} from '@popperjs/core/lib/popper-lite';
import arrow from '@popperjs/core/lib/modifiers/arrow';
import flip from '@popperjs/core/lib/modifiers/flip';
import offset from '@popperjs/core/lib/modifiers/offset';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';

const createPopper = popperGenerator({
  defaultModifiers: [...defaultModifiers, offset, flip, preventOverflow, arrow],
});


....

  const bsModifier: Partial<Modifier<any>> = {
    name: 'bootstrapClasses',
    enabled: true,
    phase: 'write',
    fn({state}) {
      if (baseClass) {
        const bsClassRegExp = new RegExp(baseClass + '-[a-z]+', 'gi');

        const targetElement: HTMLElement = state.elements.popper as HTMLElement;
        const placement = state.placement;

        let className = targetElement.className;

        // Remove old bootstrap classes
        className = className.replace(bsClassRegExp, '');

        // Add current placements
        const[primary, secondary] = placement.split('-');
        className += ` ${baseClass}-${primary}`;
        if (secondary) {
          className += ` ${baseClass}-${convertPlacementToBs(primary, secondary)}`;
        }

        // Remove multiple spaces
        className = className.trim().replace(spacesRegExp, ' ');

        // Reassign
        targetElement.className = className;
      }
    },
  };



  const popperInstance = createPopper(hostElement, targetElement, {
    placement: mainPlacement,
    modifiers: [
      bsModifier,
      {
        name: 'arrow',
        options: {
          padding: 5,
        },
      },
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: ({placement, reference, popper}) => {
            return baseClass === 'bs-popover' ? [0, 12] : [];
          },
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: popperPlacements,
        },
      },
      {
        name: 'preventOverflow',
      },
    ]
  });

  return () => popperInstance.destroy();
}

....

*/