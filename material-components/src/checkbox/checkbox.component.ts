import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';

import {MaterialCheckboxLayoutMetadataLoader} from './checkbox.metadata';
import {MaterialCheckboxComponentOptions} from './checkbox.options';

/**
 * Component used for displaying material checkbox
 */
@Component(
{
    selector: 'material-checkbox',
    templateUrl: 'checkbox.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        FormPipesModule,
        CastPipesModule,
        FormComponentControlSAPipe,
        MatCheckboxModule,
        ReactiveFormsModule,
    ]
})
@LayoutEditorMetadata(MaterialCheckboxLayoutMetadataLoader)
export class MaterialCheckboxSAComponent extends FormComponentBase<MaterialCheckboxComponentOptions> implements FormComponent<MaterialCheckboxComponentOptions>
{}