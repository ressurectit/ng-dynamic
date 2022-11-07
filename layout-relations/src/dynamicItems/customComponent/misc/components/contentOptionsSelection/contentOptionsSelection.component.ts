import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DialogRef} from '@angular/cdk/dialog';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';
import {LayoutPropertiesModelType} from '@anglr/dynamic/layout-editor';
import {Dictionary} from '@jscrpt/common';

import {ContentOptionsSelectionData} from './contentOptionsSelection.interface';
import {ModelSelectedSAPipe} from '../../pipes/modelSelected/modelSelected.pipe';

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
        ModelSelectedSAPipe,
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
     * Array of used components and their model names
     */
    protected usedComponents: Dictionary<string[]> = {};

    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) protected data: ContentOptionsSelectionData,
                protected dialog: DialogRef<ContentOptionsSelectionSAComponent, Dictionary<string[]>>,)
    {
        for(const id in this.data.usedComponents)
        {
            const models = this.data.usedComponents[id];

            this.usedComponents[id] = [...models];
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

        this.usedComponents[this.component.value] = [];
    }

    /**
     * Removes component options
     * @param id - Id of component that should be removed
     */
    protected removeComponent(id: string): void
    {
        delete this.usedComponents[id];
    }

    /**
     * Toggle selected model in component
     * @param id - Id of component to be edited
     * @param type - Type to be added to component
     */
    protected toggleSelected(id: string, type: LayoutPropertiesModelType): void
    {
        this.usedComponents[id] ??= [];

        const index = this.usedComponents[id].indexOf(type.name);

        //remove
        if(index >= 0)
        {
            this.usedComponents[id].splice(index, 1);
            this.usedComponents[id] = [...this.usedComponents[id]];
        }
        //add
        else
        {
            this.usedComponents[id] =
            [
                ...this.usedComponents[id],
                type.name,
            ];
        }
    }
}