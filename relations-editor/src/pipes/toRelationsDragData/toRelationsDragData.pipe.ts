import {Pipe, PipeTransform, inject} from '@angular/core';
import {DefaultsOverride} from '@anglr/dynamic';
import {extend} from '@jscrpt/common';

import type {NodesPaletteItem} from '../../components';
import {RelationsNodeDragData} from '../../interfaces';
import {RELATIONS_DEFAULTS_OVERRIDE} from '../../misc/tokens';

/**
 * Transforms NodesPaletteItem item to RelationsNodeDragData
 */
@Pipe({name: 'toRelationsDragData', standalone: true})
export class ToRelationsDragDataSAPipe implements PipeTransform
{
    //######################### protected properties #########################
    
    /**
     * Default options override service
     */
    protected defaultsOverride: DefaultsOverride|null = inject(RELATIONS_DEFAULTS_OVERRIDE, {optional: true});

    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Transforms NodesPaletteItem item to RelationsNodeDragData
     * @param value - Palette item to be transformed
     * @param id - Unique id to be used for new node
     * @param singleton - Indication whether is new node singleton, can be used only once
     * @param scope - Current scope that is being used
     */
    public transform(value: NodesPaletteItem, id: string, singleton: boolean|undefined, scope: string|undefined): RelationsNodeDragData
    {
        const newId = singleton ? value.itemSource.name : `${value.itemSource.name}-${id}`;

        return {
            metadata:
            {
                id: newId,
                displayName: singleton ? this.defaultsOverride?.getDisplayName(value.itemSource.package, value.itemSource.name, value.metadata.displayName) || value.metadata.displayName || value.itemSource.name : undefined,
                package: value.itemSource.package,
                name: value.itemSource.name,
                scope,
                relationsOptions: extend(true, {}, this.defaultsOverride?.getOptions(value.itemSource.package, value.itemSource.name, value.metadata.metaInfo?.defaultOptions) ?? value.metadata.metaInfo?.defaultOptions),
                outputs: [],
                nodeMetadata:
                {
                    scopeConfigurable: !singleton ?? false,
                    coordinates:
                    {
                        x: 0,
                        y: 0
                    },
                    options: null,
                }
            },
        };
    }
}