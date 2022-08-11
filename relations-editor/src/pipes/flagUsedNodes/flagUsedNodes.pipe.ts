import {Pipe, PipeTransform} from '@angular/core';

import {NodesPaletteItem} from '../../components';

/**
 * Adds information whether item was already used in relations for NodesPaletteItem
 */
@Pipe({name: 'flagUsedNodes', standalone: true})
export class FlagUsedNodesSAPipe implements PipeTransform
{
    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Adds information whether item was already used in relations for NodesPaletteItem
     * @param value - Palette items to be transformed
     * @param registeredNodes - List of registered nodes
     */
    public transform(value: NodesPaletteItem[], registeredNodes: string[]): NodesPaletteItem[]
    {
        return value?.map(item =>
        {
            if (item.metadata)
            {
                item.metadata.used = registeredNodes?.indexOf(item.itemSource.name) > 0;
            }

            return item;
        });
    }
}