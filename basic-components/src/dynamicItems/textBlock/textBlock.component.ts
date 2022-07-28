import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {TextBlockComponentOptions} from './textBlock.options';
import {TextBlockLayoutMetadataLoader} from './textBlock.metadata';

/**
 * Component used for displaying text block
 */
@Component(
{
    selector: 'text-block',
    templateUrl: 'textBlock.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorMetadata(TextBlockLayoutMetadataLoader)
export class TextBlockSAComponent extends LayoutComponentBase<TextBlockComponentOptions> implements LayoutComponent<TextBlockComponentOptions>
{
}