import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {MaterialDatepickerLayoutMetadataLoader, MaterialDatepickerRelationsMetadataLoader} from './datepicker.metadata';
import {MaterialDatepickerComponentOptions} from './datepicker.options';

/**
 * Component used for displaying material datepicker
 */
@Component(
{
    selector: 'material-datepicker',
    templateUrl: 'datepicker.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        ReactiveFormsModule,
        FormPipesModule,
        CastPipesModule,
        FormComponentControlSAPipe,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ]
})
@RelationsEditorMetadata(MaterialDatepickerRelationsMetadataLoader)
@LayoutEditorMetadata(MaterialDatepickerLayoutMetadataLoader)
export class MaterialDatepickerSAComponent extends FormComponentBase<MaterialDatepickerComponentOptions> implements FormComponent<MaterialDatepickerComponentOptions>
{}