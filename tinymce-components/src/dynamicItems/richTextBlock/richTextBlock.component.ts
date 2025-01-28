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
    template: '',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorMetadata(RichTextBlockLayoutMetadataLoader)
export class RichTextBlockComponent extends LayoutComponentBase<RichTextBlockComponentOptions> implements LayoutComponent<RichTextBlockComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        this.componentElement.nativeElement.innerHTML = this.options?.content ?? '';
    }
}