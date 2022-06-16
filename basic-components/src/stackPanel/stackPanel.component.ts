import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponentRendererSADirective, StyledLayoutComponent, StyledLayoutComponentBase} from '@anglr/dynamic/layout';

import {StackPanelComponentOptions} from './stackPanel.options';

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
export class StackPanelComponent extends StyledLayoutComponentBase<StackPanelComponentOptions> implements StyledLayoutComponent<StackPanelComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * Method that is called when options are set, allows to hook to changing of options
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