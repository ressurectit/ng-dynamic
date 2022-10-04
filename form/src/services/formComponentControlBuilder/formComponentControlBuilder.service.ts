import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutComponentsIteratorItem, LayoutComponentsIteratorService} from '@anglr/dynamic/layout-editor';

import {FormComponentOptions} from '../../misc/formComponentBase.options';
import {FormComponentControlType} from '../../misc/enums';

@Injectable()
export class FormComponentControlBuilder
{
    //######################### constructor #########################

    constructor(private _iteratorsSvc: LayoutComponentsIteratorService)
    {}

    //######################### public methods #########################

    /**
     * Build form group from layout metadata
     * @param layoutMetadata 
     * @returns 
     */
    public async build(layoutMetadata: LayoutComponentMetadata): Promise<FormGroup>
    {
        const formGroup = new FormGroup({});
        let activeGroup: FormGroup|null = formGroup;
        for await (const iteratorItem of this._iteratorsSvc.getIteratorFor(layoutMetadata))
        {
            const controlName = this._getControlName(iteratorItem.metadata);
            if (controlName)
            {
                const control = this._getControlForMetadata(iteratorItem.metadata);
                this._getActiveGroup(iteratorItem.parent, activeGroup).addControl(controlName, control);

                if (control instanceof FormGroup)
                {
                    activeGroup = control;
                }
            }
        }
        return formGroup;
    }

    //######################### private methods #########################

    /**
     * Get active form group for specific layout component
     * @param parentIterator parent layout component iterator item
     * @param group active form group
     * @returns 
     */
    private _getActiveGroup(parentIterator: LayoutComponentsIteratorItem|null|undefined, group: FormGroup): FormGroup
    {
        //Already on root FormGroup
        if (!group.parent ||
            !parentIterator)
        {
            return group;
        }

        const parentControlName = this._getControlName(parentIterator.metadata);

        //Parent component is of Form Component control type
        if (parentControlName)
        {
            //Current group is parent component
            if (group.parent.get(parentControlName))
            {
                return group;
            }
            //We have to find parent form group
            else
            {
                return this._getActiveGroup(parentIterator, group.parent as FormGroup);
            }
        } 
        else if (!parentIterator.parent)
        {
            return this._getActiveGroup(parentIterator.parent, group.root as FormGroup);
        }

        //Parent component is not of Form Component control type
        return this._getActiveGroup(parentIterator.parent, group);
    }

    /**
     * Gets component control name
     * @param metadata component metadata
     * @returns 
     */
    private _getControlName(metadata: LayoutComponentMetadata)
    {
        if (!metadata)
        {
            return null;
        }

        return (<FormComponentOptions>metadata.options)?.controlName;
    }

    /**
     * Gets specific control for layout component
     * @param metadata component metadata
     * @returns 
     */
    private _getControlForMetadata(metadata: LayoutComponentMetadata): AbstractControl
    {
        switch ((<FormComponentOptions>metadata?.options)?.controlType)
        {
            case FormComponentControlType.FormArray:
                return new FormArray([]);
            case FormComponentControlType.FormGroup:
                return new FormGroup({});
            default:
                return new FormControl();
        }
    }
}