import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {MetadataSelectorComponentOptions} from '../metadataSelector.options';
import {MetadataSelectorSAComponent} from '../metadataSelector.component';

/**
 * Component used for displaying metadata selector designer
 */
@Component(
{
    selector: 'metadata-selector-designer',
    templateUrl: 'metadataSelectorDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataSelectorDesignerSAComponent extends MetadataSelectorSAComponent implements LayoutComponent<MetadataSelectorComponentOptions>
{
}