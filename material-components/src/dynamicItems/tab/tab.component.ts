import {Component, ChangeDetectionStrategy, Input, inject} from '@angular/core';
import {MAT_TAB, MatTab, MatTabsModule} from '@angular/material/tabs';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';

import {MaterialTabComponentOptions} from './tab.options';
import {MaterialTabLayoutMetadataLoader, MaterialTabRelationsMetadataLoader} from './tab.metadata';
import {MATERIAL_TAB_GROUP} from '../tabGroup/tabGroup.component';

/**
 * Component used for displaying toggle panel layout
 */
@Component(
{
    selector: 'material-tab',
    templateUrl: 'tab.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        CommonModule,
        MatTabsModule,
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<MaterialTabComponentOptions>(options => options?.children ?? [])
@LayoutEditorMetadata(MaterialTabLayoutMetadataLoader)
@RelationsEditorMetadata(MaterialTabRelationsMetadataLoader)
export class MaterialTabComponent extends LayoutComponentBase<MaterialTabComponentOptions> implements LayoutComponent<MaterialTabComponentOptions>, RelationsComponent
{
    //######################### protected properties #########################

    /**
     * Indication whether tab is visible
     */
    protected visibleValue: boolean|null|undefined;

    /**
     * Closes tab group
     */
    protected closestTabGroup: any = inject(MATERIAL_TAB_GROUP, {optional: true});

    /**
     * Instance of closest tab
     */
    protected closestTab: MatTab = inject(MAT_TAB, {optional: true});

    //######################### public properties #########################

    /**
     * Material tab relation options
     */
    public relationsOptions: any;

    /**
     * Material tab index in parent tab group
     */
    public tabGroupIndex: number|null|undefined;

    //######################### public properties - inputs #########################

    /**
     * Indication whether tab is visible
     */
    @Input()
    public set visible(visible: boolean|null|undefined)
    {
        this.visibleValue = visible;
        if (this.visible)
        {
            this.showTab();
        }
        else
        {
            this.hideTab();
        }
    }
    public get visible(): boolean|null|undefined
    {
        return this.visibleValue;
    }

    //######################### protected - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {}

    /**
     * Hides tab content
     */
    protected hideTab()
    {
        if (this.closestTab)
        {
            this.closestTab.disabled = true;
        }

        this.closestTabGroup?.onHideTab(this.tabGroupIndex);
    }

    /**
     * Shows tab content
     */
    protected showTab()
    {
        if (this.closestTab)
        {
            this.closestTab.disabled = false;
        }

        this.closestTabGroup?.onShowTab();
    }
}