import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldAppearance, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TextFieldModule} from '@angular/cdk/text-field';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {MaterialTextareaLayoutMetadataLoader} from './textarea.metadata';
import {MaterialTextareaComponentOptions} from './textarea.options';

/**
 * Component used for displaying material text field
 */
@Component(
{
    selector: 'material-textarea',
    templateUrl: 'textarea.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
    ]
})
@LayoutEditorMetadata(MaterialTextareaLayoutMetadataLoader)
export class MaterialTextareaSAComponent extends LayoutComponentBase<MaterialTextareaComponentOptions> implements LayoutComponent<MaterialTextareaComponentOptions>
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