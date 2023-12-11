import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Injector, Inject, Optional, Input} from '@angular/core';
import {MAT_TAB, MatTab, MatTabsModule} from '@angular/material/tabs';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
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
    standalone: true,
    imports:
    [
        CommonModule,
        MatTabsModule,
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<MaterialTabComponentOptions>(options => options?.children ?? [])
@LayoutEditorMetadata(MaterialTabLayoutMetadataLoader)
@RelationsEditorMetadata(MaterialTabRelationsMetadataLoader)
export class MaterialTabSAComponent extends LayoutComponentBase<MaterialTabComponentOptions> implements LayoutComponent<MaterialTabComponentOptions>, RelationsComponent
{
    //######################### private properties #########################

    /**
     * Indication whether tab is visible
     */
    private _visible: boolean|null|undefined;

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
        this._visible = visible;
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
        return this._visible;
    }

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                componentElement: ElementRef<HTMLElement>,
                injector: Injector,
                @Inject(MATERIAL_TAB_GROUP) @Optional() private _closestTabGroup: any,
                @Inject(MAT_TAB) @Optional() private _closestTab: MatTab)
    {
        super(changeDetector, componentElement, injector);
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
        if (this._closestTab)
        {
            this._closestTab.disabled = true;
        }
            
        this._closestTabGroup?.onHideTab(this.tabGroupIndex);
    }

    /**
     * Shows tab content
     */
    protected showTab()
    {
        if (this._closestTab)
        {
            this._closestTab.disabled = false;
        }

        this._closestTabGroup?.onShowTab();
    }
}