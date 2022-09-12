import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {CheckboxLayoutMetadataLoader, CheckboxRelationsMetadataLoader} from './checkbox.metadata';
import {CheckboxComponentOptions} from './checkbox.options';

/**
 * Component used for displaying  checkbox
 */
@Component(
{
    selector: 'form-checkbox',
    templateUrl: 'checkbox.component.html',
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
@RelationsEditorMetadata(CheckboxRelationsMetadataLoader)
@LayoutEditorMetadata(CheckboxLayoutMetadataLoader)
export class CheckboxSAComponent extends FormComponentBase<CheckboxComponentOptions, boolean> implements FormComponent<CheckboxComponentOptions>
{}