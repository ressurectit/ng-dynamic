import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {SelectLayoutMetadataLoader, SelectRelationsMetadataLoader} from './select.metadata';
import {SelectComponentOptions} from './select.options';

/**
 * Component used for displaying text field
 */
@Component(
{
    selector: 'form-select',
    templateUrl: 'select.component.html',
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
@RelationsEditorMetadata(SelectRelationsMetadataLoader)
@LayoutEditorMetadata(SelectLayoutMetadataLoader)
export class SelectSAComponent extends FormComponentBase<SelectComponentOptions> implements FormComponent<SelectComponentOptions>
{
    //######################### public properties #########################

    public values: any[] = ['foo', 'bar'];
}