import {Pipe, PipeTransform} from '@angular/core';
import {extend} from '@jscrpt/common';

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
        const newId = `${value.itemSource.name}-${id}`;

        return {
            metadata:
            {
                id: newId,
                displayName: newId,
                package: value.itemSource.package,
                name: value.itemSource.name,
                options: extend(true, {}, value.metadata.metaInfo?.defaultOptions),
            },
            parentId: null,
            index: null,
        };
    }
}