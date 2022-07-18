import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldAppearance, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {MaterialTextFieldLayoutMetadataLoader} from './textField.metadata';
import {MaterialTextFieldComponentOptions} from './textField.options';

/**
 * Component used for displaying material text field
 */
@Component(
{
    selector: 'material-text-field',
    templateUrl: 'textField.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        MatFormFieldModule,
        MatInputModule,
    ]
})
@LayoutEditorMetadata(MaterialTextFieldLayoutMetadataLoader)
export class MaterialTextFieldSAComponent extends LayoutComponentBase<MaterialTextFieldComponentOptions> implements LayoutComponent<MaterialTextFieldComponentOptions>
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