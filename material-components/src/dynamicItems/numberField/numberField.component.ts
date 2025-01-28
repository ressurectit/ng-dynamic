import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase} from '@anglr/dynamic/form';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {MaterialNumberFieldLayoutMetadataLoader, MaterialNumberFieldRelationsMetadataLoader} from './numberField.metadata';
import {MaterialNumberFieldComponentOptions} from './numberField.options';

/**
 * Component used for displaying material text field
 */
@Component(
{
    selector: 'material-number-field',
    templateUrl: 'numberField.component.html',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        FormPipesModule,
        CastPipesModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ]
})
@RelationsEditorMetadata(MaterialNumberFieldRelationsMetadataLoader)
@LayoutEditorMetadata(MaterialNumberFieldLayoutMetadataLoader)
export class MaterialNumberFieldSAComponent extends FormComponentBase<MaterialNumberFieldComponentOptions> implements FormComponent<MaterialNumberFieldComponentOptions>
{}