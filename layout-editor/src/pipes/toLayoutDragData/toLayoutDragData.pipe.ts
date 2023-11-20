import {Pipe, PipeTransform, inject} from '@angular/core';
import {extend} from '@jscrpt/common';

import {ComponentsPaletteItem} from '../../components';
import {LayoutComponentDragData} from '../../interfaces';
import {DefaultOptionsOverride} from '../../../../src';
import {LAYOUT_DEFAULT_OPTIONS_OVERRIDE} from '../../misc/tokens';

/**
 * Transforms ComponentsPaletteItem item to LayoutComponentDragData
 */
@Pipe({name: 'toLayoutDragData', standalone: true})
export class ToLayoutDragDataSAPipe implements PipeTransform
{
    //######################### protected properties #########################

    /**
     * Default options override service
     */
    protected _defaultOptionsOverride: DefaultOptionsOverride|null = inject(LAYOUT_DEFAULT_OPTIONS_OVERRIDE, {optional: true});

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
                displayName: '',
                package: value.itemSource.package,
                name: value.itemSource.name,
                options: extend(true, {}, this._defaultOptionsOverride?.get(value.itemSource.package, value.itemSource.name, value.metadata.metaInfo?.defaultOptions) ?? value.metadata.metaInfo?.defaultOptions),
            },
            parentId: null,
            index: null,
        };
    }
}