import {Component, ChangeDetectionStrategy, InjectionToken, ComponentRef, ViewChild} from '@angular/core';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentMetadata, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';
import {generateId} from '@jscrpt/common';

import {MaterialTabGroupComponentOptions} from './tabGroup.options';
import {MaterialTabGroupLayoutMetadataLoader} from './tabGroup.metadata';
import {MaterialTabSAComponent} from '../tab/tab.component';

/**
 * Injection token used for injecting current scope id
 */
export const MATERIAL_TAB_GROUP: InjectionToken<string> = new InjectionToken<string>('MATERIAL_TAB_GROUP');

/**
 * Component used for displaying toggle panel layout
 */
@Component(
{
    selector: 'material-tab-group',
    templateUrl: 'tabGroup.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        CommonModule,
        MatTabsModule,
        MaterialTabSAComponent,
        LayoutComponentRendererSADirective,
    ],
    providers:
    [
        {
            provide: MATERIAL_TAB_GROUP,
            useExisting: MaterialTabGroupSAComponent,
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<MaterialTabGroupComponentOptions>(options => options?.tabs ? options?.tabs.map(datum => <LayoutComponentMetadata>datum.content) : [])
@LayoutEditorMetadata(MaterialTabGroupLayoutMetadataLoader)
export class MaterialTabGroupSAComponent extends LayoutComponentBase<MaterialTabGroupComponentOptions> implements LayoutComponent<MaterialTabGroupComponentOptions>, RelationsComponent
{
    
    //######################### protected properties - view children #########################

    /**
     * Material tab group component
     */
    @ViewChild(MatTabGroup)
    protected tabGroup: MatTabGroup|null|undefined;

    //######################### public properties - Implementation of RelationsComponent #########################

    /**
     * Relation options for material tab group
     */
    public relationsOptions: MaterialTabGroupComponentOptions|null|undefined;

    //######################### public properties - inputs #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        if (this.relationsOptions)
        {
            this.relationsOptions.tabs = this.options?.tabs;
        }
    }

    /**
     * Handles tab content change
     * @param componentRef Tab component ref
     * @param index index in tab group
     */
    protected onTabComponentChange(componentRef: ComponentRef<MaterialTabSAComponent>|null, index: number): void
    {
        if (componentRef?.instance)
        {
            componentRef.instance.tabGroupIndex = index; 
            componentRef.instance.invalidateVisuals();
        }
    }

    //######################### public methods #########################

    /**
     * Handles tab visibility in group
     * @param index 
     * @returns 
     */
    public onHideTab(index: number|null|undefined)
    {
        if (this.tabGroup?.selectedIndex === index &&
            this.tabGroup?._tabs)
        {
            for (let i = 0; i < this.tabGroup._tabs.length; i++)
            {
                const tab = this.tabGroup._tabs.get(i);

                if (!tab?.disabled)
                {
                    this.tabGroup.selectedIndex = i;
                    return;
                }
            }
        }

        this.invalidateVisuals();
    }

    public override onInit()
    {
        if (this.options &&
            !this.options?.tabs)
        {
            this.options.tabs = [
                {
                    title: 'Tab',
                    content: {
                        id: `${generateId(6)}-tab`,
                        package: 'material-components',
                        name: 'tab',
                        options: {}
                    }
                }
            ];
        }
    }
}