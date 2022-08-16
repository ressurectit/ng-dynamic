import {Pipe, PipeTransform} from '@angular/core';
import {extend} from '@jscrpt/common';

import {ComponentsPaletteItem} from '../../components';
import {LayoutComponentDragData} from '../../interfaces';

//TODO: rework for generated id again

/**
 * Transforms ComponentsPaletteItem item to LayoutComponentDragData
 */
@Pipe({name: 'toLayoutDragData', standalone: true})
export class ToLayoutDragDataSAPipe implements PipeTransform
{
    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Transforms ComponentsPaletteItem item to LayoutComponentDragData
     * @param value - Palette item to be transformed
     * @param _ - Used for refreshing value of pipe
     */
    public transform(value: ComponentsPaletteItem, _: boolean): LayoutComponentDragData
    {
        return {
            metadata:
            {
                id: '',
                displayName: '',
                package: value.itemSource.package,
                name: value.itemSource.name,
                options: extend(true, {}, value.metadata.metaInfo?.defaultOptions),
            },
            parentId: null,
            index: null,
        };
    }
}