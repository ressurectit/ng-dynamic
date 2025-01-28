import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';

import {IfBlockComponentOptions} from '../ifBlock.options';
import {IfBlockSAComponent} from '../ifBlock.component';

/**
 * Component used for displaying if block designer
 */
@Component(
{
    selector: 'if-block-designer',
    templateUrl: 'ifBlockDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IfBlockDesignerSAComponent extends IfBlockSAComponent implements LayoutComponent<IfBlockComponentOptions>, RelationsComponent
{
    //######################### protected - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        super.onOptionsSet();

        if(this.condition)
        {
            this.componentElement.nativeElement.classList.remove('dynamic-hidden');
        }
        else
        {
            this.componentElement.nativeElement.classList.add('dynamic-hidden');
        }
    }
}