import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PlaceholderContainerComponentOptions} from './placeholderContainer.options';
import {PlaceholderContainerLayoutMetadataLoader} from './placeholderContainer.metadata';

/**
 * Component used for displaying placeholder container
 */
@Component(
{
    selector: 'placeholder-container',
    templateUrl: 'placeholderContainer.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<PlaceholderContainerComponentOptions>(options => options?.content ? [options?.content] : [])
@LayoutEditorMetadata(PlaceholderContainerLayoutMetadataLoader)
export class PlaceholderContainerSAComponent extends LayoutComponentBase<PlaceholderContainerComponentOptions> implements LayoutComponent<PlaceholderContainerComponentOptions>
{
}