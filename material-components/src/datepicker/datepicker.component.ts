import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldAppearance, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {MaterialDatepickerLayoutMetadataLoader} from './datepicker.metadata';
import {MaterialDatepickerComponentOptions} from './datepicker.options';

/**
 * Component used for displaying material datepicker
 */
@Component(
{
    selector: 'material-datepicker',
    templateUrl: 'datepicker.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ]
})
@LayoutEditorMetadata(MaterialDatepickerLayoutMetadataLoader)
export class MaterialDatepickerSAComponent extends LayoutComponentBase<MaterialDatepickerComponentOptions> implements LayoutComponent<MaterialDatepickerComponentOptions>
{
    //######################### public properties #########################

    /**
     * Gets form field appearence
     */
    public get appearance(): MatFormFieldAppearance
    {
        return <MatFormFieldAppearance>this.options?.appearance;
    }
}