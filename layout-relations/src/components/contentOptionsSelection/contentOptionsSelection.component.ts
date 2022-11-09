import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DialogRef} from '@angular/cdk/dialog';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';
import {TooltipModule} from '@anglr/common';
import {Dictionary} from '@jscrpt/common';

import {ContentOptionsSelectionData} from './contentOptionsSelection.interface';
import {GetModelSAPipe, PropertySelectedSAPipe, PropertiesMetadataSAPipe} from '../../pipes';

/**
 * Component used for displaying selection of components and their options to be editable
 */
@Component(
{
    selector: 'content-options-selection',
    templateUrl: 'contentOptionsSelection.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        MatDialogModule,
        ReactiveFormsModule,
        PropertySelectedSAPipe,
        GetModelSAPipe,
        PropertiesMetadataSAPipe,
        TooltipModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentOptionsSelectionSAComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Instance of form control that is used for selection of component
     */
    protected component: FormControl<string> = new FormControl();

    /**
     * Array of used properties for components and their models
     */
    protected usedProperties: Dictionary<Dictionary<string[]>> = {};

    /**
     * Array of available properties for components and their models
     */
    protected availableProperties: Dictionary<Dictionary<string[]>> = {};

    /**
     * Array of content components that are available
     */
    protected contentComponents: string[] = [];

    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) protected data: ContentOptionsSelectionData,
                protected dialog: DialogRef<ContentOptionsSelectionSAComponent, Dictionary<string[]>>,)
    {
        this.contentComponents = Object.keys(data.customComponentContentMetadata);

        for(const id in this.data.usedProperties)
        {
            const models = this.data.usedProperties[id];

            this.availableProperties[id] ??= {};

            for(const modelName in models)
            {
                const properties = models[modelName];

                this.availableProperties[id][modelName] = [...properties];
            }
        }

        const usedComponents = Object.keys(this.usedProperties);
        this.contentComponents = this.contentComponents.filter(itm => usedComponents.indexOf(itm) < 0);

        for(const id in data.customComponentContentMetadata)
        {
            const meta = data.customComponentContentMetadata[id];

            if(!meta?.editorMetadata.metaInfo?.optionsMetadata?.propertiesMetadata)
            {
                continue;
            }

            for(const propMeta of meta.editorMetadata.metaInfo.optionsMetadata.propertiesMetadata)
            {
                const model = new propMeta.modelType(undefined);

                if(!Object.keys(model).length)
                {
                    continue;
                }

                const modelName = propMeta.modelType.name;

                this.availableProperties[id] ??= {};
                this.availableProperties[id][modelName] ??= [];

                for(const prop in model)
                {
                    this.availableProperties[id][modelName].push(prop);
                }
            }
        }
    }

    //######################### protected methods - template bindings #########################

    /**
     * Adds component from custom component layout
     */
    protected addComponent(): void
    {
        if(!this.component.value)
        {
            return;
        }

        this.usedProperties[this.component.value] = {};
        const index = this.contentComponents.indexOf(this.component.value);

        if(index >= 0)
        {
            this.contentComponents.splice(index, 1);
            this.component.setValue(this.contentComponents[0] ?? null);
        }
    }

    /**
     * Removes component options
     * @param id - Id of component that should be removed
     */
    protected removeComponent(id: string): void
    {
        delete this.usedProperties[id];
        this.contentComponents.push(id);

        if(this.contentComponents.length == 1)
        {
            this.component.setValue(this.contentComponents[0]);
        }
    }

    /**
     * Toggle selected property in component in model
     * @param id - Id of component to be edited
     * @param modelName - Name of model to be edited
     * @param propertyName - Name of property to be toggled
     */
    protected toggleSelected(id: string, modelName: string, propertyName: string): void
    {
        this.usedProperties[id] ??= {};
        this.usedProperties[id][modelName] ??= [];

        const index = this.usedProperties[id][modelName].indexOf(propertyName);

        //remove
        if(index >= 0)
        {
            this.usedProperties[id][modelName].splice(index, 1);
            this.usedProperties[id][modelName] = [...this.usedProperties[id][modelName]];
        }
        //add
        else
        {
            this.usedProperties[id][modelName] =
            [
                ...this.usedProperties[id][modelName],
                propertyName,
            ];
        }
    }
}