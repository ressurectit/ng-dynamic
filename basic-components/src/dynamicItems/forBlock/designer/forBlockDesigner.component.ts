import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';

import {ForBlockComponentOptions, ForBlockRelationsOptions} from '../forBlock.options';
import {ForBlockSAComponent} from '../forBlock.component';

/**
 * Component used for displaying for block designer
 */
@Component(
{
    selector: 'for-block-designer',
    templateUrl: 'forBlockDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForBlockDesignerSAComponent extends ForBlockSAComponent implements LayoutComponent<ForBlockComponentOptions>, RelationsComponent<ForBlockRelationsOptions>
{
}