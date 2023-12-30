import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';

import {DialogMetadataSelectorComponentOptions, DialogMetadataSelectorRelationsOptions} from '../dialogMetadataSelector.options';
import {DialogMetadataSelectorSAComponent} from '../dialogMetadataSelector.component';

/**
 * Component used for displaying dialog metadata selector designer
 */
@Component(
{
    selector: 'dialog-metadata-selector-designer',
    templateUrl: 'dialogMetadataSelectorDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogMetadataSelectorDesignerSAComponent extends DialogMetadataSelectorSAComponent implements LayoutComponent<DialogMetadataSelectorComponentOptions>, RelationsComponent<DialogMetadataSelectorRelationsOptions>
{
}