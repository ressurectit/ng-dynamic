import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from '@anglr/dynamic';
import {LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';

import {StackPanelComponentOptions} from './stackPanel.options';

//TODO: optimize computation

/**
 * Component used for displaying stack panel layout
 */
@Component(
{
    selector: 'stack-panel',
    templateUrl: 'stackPanel.component.html',
    styleUrls: ['stackPanel.component.css'],
    host:
    {
        '[style.flex-direction]': 'options?.horizontal ? "row" : "column"',
        '[style.flex-wrap]': 'options?.wrap ? "wrap" : "nowrap"',
    },
    standalone: true,
    imports:
    [
        CommonModule,
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackPanelComponent implements LayoutComponent<StackPanelComponentOptions>
{
    //######################### properties #########################

    /**
     * Options used for rendering this component
     */
    public options!: StackPanelComponentOptions;

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
        this._changeDetector.markForCheck();
    }
}