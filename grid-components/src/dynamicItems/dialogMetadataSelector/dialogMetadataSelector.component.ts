import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {DynamicOutput, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {Grid, PluginDescription} from '@anglr/grid';
import {DialogMetadataSelectorOptions, DialogMetadataSelectorComponent as GridDialogMetadataSelector} from '@anglr/grid/material';
import {RecursivePartial} from '@jscrpt/common';

import {DialogMetadataSelectorComponentOptions, DialogMetadataSelectorRelationsOptions} from './dialogMetadataSelector.options';
import {DialogMetadataSelectorLayoutDesignerTypeLoader, DialogMetadataSelectorLayoutMetadataLoader, DialogMetadataSelectorRelationsMetadataLoader} from './dialogMetadataSelector.metadata';
import {GridPluginComponent} from '../../interfaces';

/**
 * Component used for displaying dialog metadata selector
 */
@Component(
{
    selector: 'dialog-metadata-selector',
    template: '',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorDesignerType(DialogMetadataSelectorLayoutDesignerTypeLoader)
@RelationsEditorMetadata(DialogMetadataSelectorRelationsMetadataLoader)
@LayoutEditorMetadata(DialogMetadataSelectorLayoutMetadataLoader)
export class DialogMetadataSelectorComponent extends LayoutComponentBase<DialogMetadataSelectorComponentOptions> implements GridPluginComponent<GridDialogMetadataSelector, DialogMetadataSelectorComponentOptions, DialogMetadataSelectorOptions>, RelationsComponent<DialogMetadataSelectorRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: DialogMetadataSelectorRelationsOptions|undefined|null;

    //######################### public properties - dynamic outputs #########################

    /**
     * Instance of grid
     */
    @DynamicOutput()
    public grid: Grid|undefined|null;

    //######################### public properties - implementation of GridDataLoaderPlugin #########################

    /**
     * @inheritdoc
     */
    public pluginDescription: PluginDescription<GridDialogMetadataSelector, RecursivePartial<DialogMetadataSelectorOptions>> =
    {
        instance: null,
        instanceCallback: null,
        options:
        {
            storageName: '',
            showButtonVisible: true,
        },
        type: GridDialogMetadataSelector,
    };

    //######################### public methods - implementation of GridDataLoaderPlugin #########################

    /**
     * @inheritdoc
     */
    public setGridInstance(grid: Grid): void
    {
        this.grid = grid;
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        if(this.pluginDescription.options)
        {
            this.pluginDescription.options.showButtonVisible = this.optionsSafe.showButtonVisible;
            this.pluginDescription.options.storageName = this.optionsSafe.storageName;
        }
    }
}