import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';
import {FormPipesModule} from '@anglr/common/forms';

import {MaterialPeriodLayoutMetadataLoader} from './period.metadata';
import {MaterialPeriodComponentOptions} from './period.options';

/**
 * Component used for displaying material period
 */
@Component(
{
    selector: 'material-period',
    templateUrl: 'period.component.html',
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
@LayoutEditorMetadata(MaterialPeriodLayoutMetadataLoader)
export class MaterialPeriodSAComponent extends FormComponentBase<MaterialPeriodComponentOptions> implements FormComponent<MaterialPeriodComponentOptions>
{}