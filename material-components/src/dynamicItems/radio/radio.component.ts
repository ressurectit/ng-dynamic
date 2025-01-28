import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase} from '@anglr/dynamic/form';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {MaterialRadioLayoutMetadataLoader, MaterialRadioRelationsMetadataLoader} from './radio.metadata';
import {MaterialRadioComponentOptions} from './radio.options';

/**
 * Component used for displaying material radio
 */
@Component(
{
    selector: 'material-radio',
    templateUrl: 'radio.component.html',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        FormPipesModule,
        CastPipesModule,
        ReactiveFormsModule,
        MatRadioModule,
    ]
})
@RelationsEditorMetadata(MaterialRadioRelationsMetadataLoader)
@LayoutEditorMetadata(MaterialRadioLayoutMetadataLoader)
export class MaterialRadioSAComponent extends FormComponentBase<MaterialRadioComponentOptions> implements FormComponent<MaterialRadioComponentOptions>
{}