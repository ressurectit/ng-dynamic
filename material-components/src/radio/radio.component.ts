import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';

import {MaterialRadioLayoutMetadataLoader} from './radio.metadata';
import {MaterialRadioComponentOptions} from './radio.options';

/**
 * Component used for displaying material radio
 */
@Component(
{
    selector: 'material-radio',
    templateUrl: 'radio.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        FormPipesModule,
        CastPipesModule,
        FormComponentControlSAPipe,
        ReactiveFormsModule,
        MatRadioModule,
    ]
})
@LayoutEditorMetadata(MaterialRadioLayoutMetadataLoader)
export class MaterialRadioSAComponent extends FormComponentBase<MaterialRadioComponentOptions> implements FormComponent<MaterialRadioComponentOptions>
{}