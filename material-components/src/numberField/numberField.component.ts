import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';

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
        FormPipesModule,
        CastPipesModule,
        FormComponentControlSAPipe,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ]
})
@LayoutEditorMetadata(MaterialNumberFieldLayoutMetadataLoader)
export class MaterialNumberFieldSAComponent extends FormComponentBase<MaterialNumberFieldComponentOptions> implements FormComponent<MaterialNumberFieldComponentOptions>
{}