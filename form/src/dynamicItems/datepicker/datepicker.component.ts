import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase} from '@anglr/dynamic/form';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        ReactiveFormsModule,
        FormPipesModule,
        CastPipesModule,
    ],
})
@RelationsEditorMetadata(DatepickerRelationsMetadataLoader)
@LayoutEditorMetadata(DatepickerLayoutMetadataLoader)
export class DatepickerComponent extends FormComponentBase<DatepickerComponentOptions> implements FormComponent<DatepickerComponentOptions>
{
}
