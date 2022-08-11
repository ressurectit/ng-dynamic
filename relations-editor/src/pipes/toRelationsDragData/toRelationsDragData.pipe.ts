import {Pipe, PipeTransform} from '@angular/core';
import {extend} from '@jscrpt/common';

import type {NodesPaletteItem} from '../../components';
import {RelationsNodeDragData} from '../../interfaces';

/**
 * Transforms NodesPaletteItem item to RelationsNodeDragData
 */
@Pipe({name: 'toRelationsDragData', standalone: true})
export class ToRelationsDragDataSAPipe implements PipeTransform
{
    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Transforms NodesPaletteItem item to RelationsNodeDragData
     * @param value - Palette item to be transformed
     * @param id - Unique id to be used for new node
     * @param singleton - Indication whether is new node singleton, can be used only once
     */
    public transform(value: NodesPaletteItem, id: string, singleton: boolean|undefined): RelationsNodeDragData
    {
        const newId = singleton ? id : `${value.itemSource.name}-${id}`;

        return {
            metadata:
            {
                id: newId,
                displayName: singleton ? value.metadata.displayName || value.itemSource.name : undefined,
                package: value.itemSource.package,
                name: value.itemSource.name,
                relationsOptions: extend(true, {}, value.metadata.metaInfo?.defaultOptions),
                outputs: [],
                nodeMetadata:
                {
                    coordinates:
                    {
                        x: 0,
                        y: 0
                    },
                    options: null,
                }
            }
        };
    }
}