import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldAppearance, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {MaterialNumberFieldLayoutMetadataLoader} from './numberField.metadata';
import {MaterialNumberFieldComponentOptions} from './numberField.options';

/**
 * Component used for displaying material text field
 */
@Component(
{
    selector: 'material-number-field',
    templateUrl: 'numberField.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        MatFormFieldModule,
        MatInputModule,
    ]
})
@LayoutEditorMetadata(MaterialNumberFieldLayoutMetadataLoader)
export class MaterialNumberFieldSAComponent extends LayoutComponentBase<MaterialNumberFieldComponentOptions> implements LayoutComponent<MaterialNumberFieldComponentOptions>
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