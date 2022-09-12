import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormComponentControlSAPipe, FormComponent, FormComponentBase} from '@anglr/dynamic/form';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';

import {TextFieldLayoutMetadataLoader, TextFieldRelationsMetadataLoader} from './textField.metadata';
import {TextFieldComponentOptions} from './textField.options';

/**
 * Component used for displaying  text field
 */
@Component(
{
    selector: 'form-text-field',
    templateUrl: 'textField.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        FormPipesModule,
        CastPipesModule,
        FormComponentControlSAPipe,
        ReactiveFormsModule,
        CommonModule,
    ]
})
@RelationsEditorMetadata(TextFieldRelationsMetadataLoader)
@LayoutEditorMetadata(TextFieldLayoutMetadataLoader)
export class TextFieldSAComponent extends FormComponentBase<TextFieldComponentOptions> implements FormComponent<TextFieldComponentOptions>
{
}