import {Pipe, PipeTransform} from '@angular/core';

import {ComponentsPaletteItem} from '../../components';
import {LayoutComponentDragData} from '../../interfaces';

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
     * @param id - Unique id to be used for new component
     */
    public transform(value: ComponentsPaletteItem, id: string): LayoutComponentDragData
    {
        return {
            metadata:
            {
                id: `${value.itemSource.name}-${id}`,
                package: value.itemSource.package,
                name: value.itemSource.name,
                options: {},
            },
            parentId: null
        };
    }
}