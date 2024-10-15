import {Action} from '@jscrpt/common';

import {GridPanelAreaComponentOptions} from './gridPanelArea.options';

/**
 * Applies CSS styles of element applying grid panel css grid coordinates
 * @param options - Options for grid panel cell component
 * @param styles - CSS styles of element that should be updated
 */
export const applyGridCoordinates: Action<[GridPanelAreaComponentOptions|undefined|null, CSSStyleDeclaration]> = (options, style) =>
{
    style.gridRowStart = options?.gridRowStart?.toString() ?? '';
    style.gridRowEnd = options?.gridRowEnd?.toString() ?? '';
    style.gridColumnStart = options?.gridColumnStart?.toString() ?? '';
    style.gridColumnEnd = options?.gridColumnEnd?.toString() ?? '';
};