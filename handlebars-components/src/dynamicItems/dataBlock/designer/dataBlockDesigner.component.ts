import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';

import {DataBlockComponentOptions} from '../dataBlock.options';
import {DataBlockSAComponent} from '../dataBlock.component';

/**
 * Designer component used for displaying data block
 */
@Component(
{
    selector: 'data-block-designer',
    template: '',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataBlockDesignerSAComponent extends DataBlockSAComponent implements LayoutComponent<DataBlockComponentOptions>, RelationsComponent
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        //TODO: check if required
        // if(!this.initialized)
        // {
        //     return;
        // }

        this.componentElement.nativeElement.innerHTML = this.options?.template ?? '';
    }
}