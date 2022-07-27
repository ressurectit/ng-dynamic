import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {RichTextBlockComponentOptions} from './richTextBlock.options';
import {RichTextBlockLayoutMetadataLoader} from './richTextBlock.metadata';

/**
 * Component used for displaying rich text block
 */
@Component(
{
    selector: 'rich-text-block',
    templateUrl: 'richTextBlock.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorMetadata(RichTextBlockLayoutMetadataLoader)
export class RichTextBlockSAComponent extends LayoutComponentBase<RichTextBlockComponentOptions> implements LayoutComponent<RichTextBlockComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override _onOptionsSet(): void
    {
        this._element.nativeElement.innerHTML = this.options?.content ?? '';
    }
}