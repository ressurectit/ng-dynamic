import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';

import {DialogMetadataSelectorComponentOptions, DialogMetadataSelectorRelationsOptions} from '../dialogMetadataSelector.options';
import {DialogMetadataSelectorComponent} from '../dialogMetadataSelector.component';

/**
 * Component used for displaying dialog metadata selector designer
 */
@Component(
{
    selector: 'dialog-metadata-selector-designer',
    templateUrl: 'dialogMetadataSelectorDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogMetadataSelectorDesignerComponent extends DialogMetadataSelectorComponent implements LayoutComponent<DialogMetadataSelectorComponentOptions>, RelationsComponent<DialogMetadataSelectorRelationsOptions>
{
}