import {Pipe, PipeTransform, inject} from '@angular/core';
import {DefaultsOverride} from '@anglr/dynamic';
import {extend} from '@jscrpt/common/extend';

import {ComponentsPaletteItem} from '../../components';
import {LayoutComponentDragData} from '../../interfaces';
import {LAYOUT_DEFAULTS_OVERRIDE} from '../../misc/tokens';

/**
 * Transforms ComponentsPaletteItem item to LayoutComponentDragData
 */
@Pipe({name: 'toLayoutDragData'})
export class ToLayoutDragDataPipe implements PipeTransform
{
    //######################### protected properties #########################

    /**
     * Default options override service
     */
    protected _defaultsOverride: DefaultsOverride|null = inject(LAYOUT_DEFAULTS_OVERRIDE, {optional: true});

    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Transforms ComponentsPaletteItem item to LayoutComponentDragData
     * @param value - Palette item to be transformed
     */
    public transform(value: ComponentsPaletteItem): LayoutComponentDragData
    {
        return {
            metadata:
            {
                id: '',
                displayName: this._defaultsOverride?.getDisplayName(value.itemSource.package, value.itemSource.name) || '',
                package: value.itemSource.package,
                name: value.itemSource.name,
                options: extend(true, {}, this._defaultsOverride?.getOptions(value.itemSource.package, value.itemSource.name, value.metadata.metaInfo?.defaultOptions) ?? value.metadata.metaInfo?.defaultOptions),
            },
            parentId: null,
            index: null,
        };
    }
}