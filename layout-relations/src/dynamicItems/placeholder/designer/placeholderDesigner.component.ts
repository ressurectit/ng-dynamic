import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LAYOUT_DESIGNER_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PlaceholderSAComponent} from '../placeholder.component';
import {PlaceholderComponentOptions} from '../placeholder.options';

/**
 * Component used for displaying placeholder designer
 */
@Component(
{
    selector: 'placeholder-designer',
    templateUrl: 'placeholderDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        CommonModule,
        LayoutComponentRendererSADirective,
    ],
    providers:
    [
        LAYOUT_DESIGNER_COMPONENT_TRANSFORM,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderDesignerSAComponent extends PlaceholderSAComponent implements LayoutComponent<PlaceholderComponentOptions>
{
    
}