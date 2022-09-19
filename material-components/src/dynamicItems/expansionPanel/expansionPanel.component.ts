import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {MaterialExpansionPanelComponentOptions} from './expansionPanel.options';
import {MaterialExpansionPanelLayoutMetadataLoader} from './expansionPanel.metadata';

/**
 * Component used for displaying toggle panel layout
 */
@Component(
{
    selector: 'material-expansion-panel',
    templateUrl: 'expansionPanel.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        CommonModule,
        MatExpansionModule,
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorMetadata(MaterialExpansionPanelLayoutMetadataLoader)
export class MaterialExpansionPanelSAComponent extends LayoutComponentBase<MaterialExpansionPanelComponentOptions> implements LayoutComponent<MaterialExpansionPanelComponentOptions>
{
    //######################### public properties - inputs #########################

    /**
     * Indication whether panel is expanded
     */
    @Input()
    public expanded: boolean = true;

    /**
     * Expansion panel title
     */
    @Input()
    public title: string|null|undefined;

    /**
     * Expansion panel description
     */
    @Input()
    public description: string|null|undefined;

    //######################### protected - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        this.expanded = this.options?.expanded ?? false;
        this.title = this.options?.title;
        this.description = this.options?.description;
    }
}