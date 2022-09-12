import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {NumberFieldLayoutMetadataLoader, NumberFieldRelationsMetadataLoader} from './numberField.metadata';
import {NumberFieldComponentOptions} from './numberField.options';

/**
 * Component used for displaying text field
 */
@Component(
{
    selector: 'form-number-field',
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
    ]
})
@RelationsEditorMetadata(NumberFieldRelationsMetadataLoader)
@LayoutEditorMetadata(NumberFieldLayoutMetadataLoader)
export class NumberFieldSAComponent extends FormComponentBase<NumberFieldComponentOptions> implements FormComponent<NumberFieldComponentOptions>
{}