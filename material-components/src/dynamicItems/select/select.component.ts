import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';

import {MaterialSelectLayoutMetadataLoader} from './select.metadata';
import {MaterialSelectComponentOptions} from './select.options';

/**
 * Component used for displaying material text field
 */
@Component(
{
    selector: 'material-select',
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
        MatFormFieldModule,
        MatSelectModule,
    ]
})
@LayoutEditorMetadata(MaterialSelectLayoutMetadataLoader)
export class MaterialSelectSAComponent extends FormComponentBase<MaterialSelectComponentOptions> implements FormComponent<MaterialSelectComponentOptions>
{
    //######################### public properties #########################

    public values: any[] = ['foo', 'bar'];
}