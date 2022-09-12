import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TextFieldModule} from '@angular/cdk/text-field';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {TextareaLayoutMetadataLoader, TextareaRelationsMetadataLoader} from './textarea.metadata';
import {TextareaComponentOptions} from './textarea.options';

/**
 * Component used for displaying textarea
 */
@Component(
{
    selector: 'form-textarea',
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
        TextFieldModule,
    ]
})
@RelationsEditorMetadata(TextareaRelationsMetadataLoader)
@LayoutEditorMetadata(TextareaLayoutMetadataLoader)
export class TextareaSAComponent extends FormComponentBase<TextareaComponentOptions> implements FormComponent<TextareaComponentOptions>
{}