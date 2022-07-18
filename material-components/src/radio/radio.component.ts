import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

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
        MatRadioModule,
    ]
})
@LayoutEditorMetadata(MaterialRadioLayoutMetadataLoader)
export class MaterialRadioSAComponent extends LayoutComponentBase<MaterialRadioComponentOptions> implements LayoutComponent<MaterialRadioComponentOptions>
{
    //######################### public properties #########################
}