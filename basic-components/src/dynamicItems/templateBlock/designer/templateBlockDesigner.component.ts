import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective, LayoutRenderer} from '@anglr/dynamic/layout';
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
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    providers:
    [
        LayoutRenderer,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateBlockDesignerSAComponent extends TemplateBlockSAComponent implements LayoutComponent<TemplateBlockComponentOptions>
{
}