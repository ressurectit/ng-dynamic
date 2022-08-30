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
    standalone: true,
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
    protected override _onOptionsSet(): void
    {
        super._onOptionsSet();

        if(this.condition)
        {
            this._element.nativeElement.classList.remove('hidden');
        }
        else
        {
            this._element.nativeElement.classList.add('hidden');
        }
    }
}