import {Component, ChangeDetectionStrategy} from '@angular/core';
import {StyledLayoutComponent, StyledLayoutComponentBase} from '@anglr/dynamic/layout';
import {CommonLocalizeModule, HostDisplayBlockStyle} from '@anglr/common';

import {TextBlockComponentOptions} from './textBlock.options';

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
export class TextBlockComponent extends StyledLayoutComponentBase<TextBlockComponentOptions> implements StyledLayoutComponent<TextBlockComponentOptions>
{
}