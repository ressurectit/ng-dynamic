import {Component, ChangeDetectionStrategy, ValueProvider} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective, LAYOUT_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {TemplateBlockComponentOptions} from '../templateBlock.options';
import {TemplateBlockSAComponent} from '../templateBlock.component';

/**
 * Component used for displaying template block designer
 */
@Component(
{
    selector: 'template-block-designer',
    templateUrl: '../templateBlock.component.html',
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
export class TemplateBlockDesignerSAComponent extends TemplateBlockSAComponent implements LayoutComponent<TemplateBlockComponentOptions>
{
}