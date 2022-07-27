import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {StyleBlockComponentOptions} from './styleBlock.options';
import {StyleBlockLayoutMetadataLoader} from './styleBlock.metadata';

/**
 * Component used for displaying style block
 */
@Component(
{
    selector: 'style-block',
    templateUrl: 'styleBlock.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorMetadata(StyleBlockLayoutMetadataLoader)
export class StyleBlockSAComponent extends LayoutComponentBase<StyleBlockComponentOptions> implements LayoutComponent<StyleBlockComponentOptions>
{
}