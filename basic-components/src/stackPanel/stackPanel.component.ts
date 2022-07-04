import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

import {StackPanelComponentOptions} from './stackPanel.options';
import {StackPanelLayoutMetadataLoader} from './stackPanel.metadata';

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
@LayoutEditorMetadata(StackPanelLayoutMetadataLoader)
export class StackPanelSAComponent extends LayoutComponentBase<StackPanelComponentOptions> implements LayoutComponent<StackPanelComponentOptions>
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