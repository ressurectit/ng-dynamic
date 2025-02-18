import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase} from '@anglr/dynamic/form';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {RadioLayoutMetadataLoader, RadioRelationsMetadataLoader} from './radio.metadata';
import {RadioComponentOptions} from './radio.options';

/**
 * Component used for displaying radio
 */
@Component(
{
    selector: 'form-radio',
    templateUrl: 'radio.component.html',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        CommonModule,
        FormPipesModule,
        CastPipesModule,
        ReactiveFormsModule,
    ]
})
@RelationsEditorMetadata(RadioRelationsMetadataLoader)
@LayoutEditorMetadata(RadioLayoutMetadataLoader)
export class RadioComponent extends FormComponentBase<RadioComponentOptions> implements FormComponent<RadioComponentOptions>
{}