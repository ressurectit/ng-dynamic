import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {DatepickerLayoutMetadataLoader, DatepickerRelationsMetadataLoader} from './datepicker.metadata';
import {DatepickerComponentOptions} from './datepicker.options';

/**
 * Component used for displaying datepicker
 */
@Component(
{
    selector: 'form-datepicker',
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
    ]
})
@RelationsEditorMetadata(DatepickerRelationsMetadataLoader)
@LayoutEditorMetadata(DatepickerLayoutMetadataLoader)
export class DatepickerSAComponent extends FormComponentBase<DatepickerComponentOptions> implements FormComponent<DatepickerComponentOptions>
{}