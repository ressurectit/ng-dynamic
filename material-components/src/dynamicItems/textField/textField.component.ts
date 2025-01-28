import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormComponent, FormComponentBase} from '@anglr/dynamic/form';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';

import {MaterialTextFieldLayoutMetadataLoader, MaterialTextFieldRelationsMetadataLoader} from './textField.metadata';
import {MaterialTextFieldComponentOptions} from './textField.options';

/**
 * Component used for displaying material text field
 */
@Component(
{
    selector: 'material-text-field',
    templateUrl: 'textField.component.html',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        FormPipesModule,
        CastPipesModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonModule,
    ]
})
@RelationsEditorMetadata(MaterialTextFieldRelationsMetadataLoader)
@LayoutEditorMetadata(MaterialTextFieldLayoutMetadataLoader)
export class MaterialTextFieldComponent extends FormComponentBase<MaterialTextFieldComponentOptions> implements FormComponent<MaterialTextFieldComponentOptions>
{
}