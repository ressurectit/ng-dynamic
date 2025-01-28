import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {MetadataSelectorComponentOptions} from '../metadataSelector.options';
import {MetadataSelectorComponent} from '../metadataSelector.component';

/**
 * Component used for displaying metadata selector designer
 */
@Component(
{
    selector: 'metadata-selector-designer',
    templateUrl: 'metadataSelectorDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataSelectorDesignerComponent extends MetadataSelectorComponent implements LayoutComponent<MetadataSelectorComponentOptions>
{
}