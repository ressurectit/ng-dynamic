import {Component, ChangeDetectionStrategy} from '@angular/core';
import {HostDisplayBlockStyle} from '@anglr/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

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
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<BlockComponentOptions>(options => options?.content ? [options?.content] : [])
@LayoutEditorMetadata(BlockLayoutMetadataLoader)
export class BlockComponent extends LayoutComponentBase<BlockComponentOptions> implements LayoutComponent<BlockComponentOptions>
{
}