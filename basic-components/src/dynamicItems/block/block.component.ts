import {Component, ChangeDetectionStrategy} from '@angular/core';
import {HostDisplayBlockStyle} from '@anglr/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

import {BlockComponentOptions} from './block.options';
import {BlockLayoutMetadataLoader} from './block.metadata';

/**
 * Component used for displaying block
 */
@Component(
{
    selector: 'block',
    templateUrl: 'block.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorMetadata(BlockLayoutMetadataLoader)
export class BlockSAComponent extends LayoutComponentBase<BlockComponentOptions> implements LayoutComponent<BlockComponentOptions>
{
}