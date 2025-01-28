import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HostDisplayFlexStyle} from '@anglr/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

import {StackPanelComponentOptions} from './stackPanel.options';
import {StackPanelLayoutMetadataLoader} from './stackPanel.metadata';

/**
 * Component used for displaying stack panel layout
 */
@Component(
{
    selector: 'stack-panel',
    templateUrl: 'stackPanel.component.html',
    styles: [HostDisplayFlexStyle],
    imports:
    [
        CommonModule,
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<StackPanelComponentOptions>(options => options?.children ?? [])
@LayoutEditorMetadata(StackPanelLayoutMetadataLoader)
export class StackPanelSAComponent extends LayoutComponentBase<StackPanelComponentOptions> implements LayoutComponent<StackPanelComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        this._setStyles();
    }

    //######################### protected methods #########################

    /**
     * Sets styles for stack panel
     */
    protected _setStyles(): void
    {
        const style = this.componentElement.nativeElement.style;

        style.flexDirection = this.options?.horizontal ? 'row' : 'column';
        style.flexWrap = this.options?.wrap ? 'wrap' : 'nowrap';
    }
}