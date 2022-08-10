import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TextFieldModule} from '@angular/cdk/text-field';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {MaterialTextareaLayoutMetadataLoader, MaterialTextareaRelationsMetadataLoader} from './textarea.metadata';
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
        FormPipesModule,
        CastPipesModule,
        FormComponentControlSAPipe,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
    ]
})
@RelationsEditorMetadata(MaterialTextareaRelationsMetadataLoader)
@LayoutEditorMetadata(MaterialTextareaLayoutMetadataLoader)
export class MaterialTextareaSAComponent extends FormComponentBase<MaterialTextareaComponentOptions> implements FormComponent<MaterialTextareaComponentOptions>
{}