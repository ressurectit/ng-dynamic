import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';

import {IfBlockComponentOptions} from '../ifBlock.options';
import {IfBlockSAComponent} from '../ifBlock.component';

//TODO: fixup default and initial value

/**
 * Component used for displaying if block designer
 */
@Component(
{
    selector: 'if-block-designer',
    templateUrl: 'ifBlockDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IfBlockDesignerSAComponent extends IfBlockSAComponent implements LayoutComponent<IfBlockComponentOptions>, RelationsComponent
{
}