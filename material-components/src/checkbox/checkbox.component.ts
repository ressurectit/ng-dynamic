import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

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
        MatCheckboxModule,
    ]
})
@LayoutEditorMetadata(MaterialCheckboxLayoutMetadataLoader)
export class MaterialCheckboxSAComponent extends LayoutComponentBase<MaterialCheckboxComponentOptions> implements LayoutComponent<MaterialCheckboxComponentOptions>
{}