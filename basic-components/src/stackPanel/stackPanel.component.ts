import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicClassMetadata} from '@anglr/dynamic';
import {LayoutComponentRendererSADirective, StyledLayoutComponent, StyledLayoutComponentBase} from '@anglr/dynamic/layout';

import {StackPanelComponentOptions} from './stackPanel.options';
import {StackPanelMetadata} from './stackPanel.metadata';

/**
 * Component used for displaying stack panel layout
 */
@Component(
{
    selector: 'stack-panel',
    templateUrl: 'stackPanel.component.html',
    styleUrls: ['stackPanel.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DynamicClassMetadata<any, any>(StackPanelMetadata, 'test')
export class StackPanelComponent extends StyledLayoutComponentBase<StackPanelComponentOptions> implements StyledLayoutComponent<StackPanelComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override _optionsSet(): void
    {
        this._setStyles();
    }

    //######################### protected methods #########################

    /**
     * Sets styles for stack panel
     */
    protected _setStyles(): void
    {
        const style = this._element.nativeElement.style;

        style.flexDirection = this._options?.horizontal ? 'row' : 'column';
        style.flexWrap = this._options?.wrap ? 'wrap' : 'nowrap';
    }
}