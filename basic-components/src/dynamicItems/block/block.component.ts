import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

import {BlockComponentOptions} from './block.options';
import {BlockLayoutMetadataLoader} from './block.metadata';

/**
 * Component used for displaying block
 */
@Component(
{
    selector: 'div',
    templateUrl: 'block.component.html',
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