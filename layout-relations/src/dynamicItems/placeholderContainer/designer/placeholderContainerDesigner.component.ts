import {Component, ChangeDetectionStrategy, ValueProvider} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective, LAYOUT_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PlaceholderContainerSAComponent} from '../placeholderContainer.component';
import {PlaceholderContainerComponentOptions} from '../placeholderContainer.options';

/**
 * Component used for displaying placeholder container designer
 */
@Component(
{
    selector: 'placeholder-container-designer',
    templateUrl: '../placeholderContainer.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    providers:
    [
        <ValueProvider>
        {
            provide: LAYOUT_COMPONENT_TRANSFORM,
            useValue: null
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderContainerDesignerSAComponent extends PlaceholderContainerSAComponent implements LayoutComponent<PlaceholderContainerComponentOptions>
{
}