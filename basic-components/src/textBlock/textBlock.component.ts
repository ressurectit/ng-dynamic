import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {LayoutComponent} from '@anglr/dynamic';
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
export class TextBlockComponent implements LayoutComponent<TextBlockComponentOptions>
{
    //######################### properties #########################

    /**
     * Options used for rendering this component
     */
    public options!: TextBlockComponentOptions;

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef,)
    {
    }

    //######################### public methods - implementation of LayoutComponent #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }
}