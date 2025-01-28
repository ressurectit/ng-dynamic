import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererDirective, LayoutRenderer} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {TemplateBlockComponentOptions} from '../templateBlock.options';
import {TemplateBlockComponent} from '../templateBlock.component';

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
        LayoutComponentRendererDirective,
    ],
    providers:
    [
        LayoutRenderer,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateBlockDesignerComponent extends TemplateBlockComponent implements LayoutComponent<TemplateBlockComponentOptions>
{
}