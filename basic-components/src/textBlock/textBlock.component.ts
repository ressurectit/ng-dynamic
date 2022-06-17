import {Component, ChangeDetectionStrategy} from '@angular/core';
import {StyledLayoutComponent, StyledLayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CommonLocalizeModule, HostDisplayBlockStyle} from '@anglr/common';

import {TextBlockComponentOptions} from './textBlock.options';
import {TextBlockLayoutMetadata} from './textBlock.metadata';

/**
 * Component used for displaying text block
 */
@Component(
{
    selector: 'text-block',
    templateUrl: 'textBlock.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        CommonLocalizeModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorMetadata(TextBlockLayoutMetadata)
export class TextBlockComponent extends StyledLayoutComponentBase<TextBlockComponentOptions> implements StyledLayoutComponent<TextBlockComponentOptions>
{
}