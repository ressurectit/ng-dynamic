import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {TitledDialogService} from '@anglr/common/material';
import {LayoutEditorMetadataExtractor, PropertiesControl, PropertiesControlBase} from '@anglr/dynamic/layout-editor';
import {generateId} from '@jscrpt/common';

import {MaterialTabGroupComponentOptions} from '../../../tabGroup.options';

/**
 * Component used for displaying material tab group properties control
 */
@Component(
{
    selector: 'material-tab-group-properties-control',
    templateUrl: 'tabGroupPropertiesControl.component.html',
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        FirstUppercaseLocalizePipe,
        CdkDrag,
        CdkDragHandle,
        CdkDropList
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialTabGroupPropertiesControlComponent extends PropertiesControlBase<MaterialTabGroupComponentOptions> implements PropertiesControl<MaterialTabGroupComponentOptions>
{
    //######################### protected properties #########################

    /**
     * Tabs control
     */
    protected get tabsControl(): FormArray|null|undefined
    {
        return <FormArray>this.form?.controls.tabs;
    }

    /**
     * Tabs control form groups
     */
    protected get tabsControls(): FormGroup[]|null|undefined
    {
        return <FormGroup[]>this.tabsControl?.controls;
    }

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                metadataExtractor: LayoutEditorMetadataExtractor,
                protected dialog: TitledDialogService,
                protected fb: FormBuilder)
    {
        super(changeDetector, metadataExtractor);
    }

    //######################### protected methods - template bindings #########################

    /**
     * Adds new tab to tab group
     */
    protected async addTab(): Promise<void>
    {
        this.tabsControl?.push(this.fb.group({
            title: 'Tab',
            content: {
                id: `${generateId(6)}-tab`,
                package: 'material-components',
                name: 'tab',
                options: {}
            }
        }));
    }

    /**
     * Removes tab on specified index in form array
     * @param index Tab index to remove
     */
    protected removeTab(index: number): void
    {
        this.tabsControl?.removeAt(index);
    }

    /**
     * Reorders material tabs
     * @param event 
     * @returns 
     */
    protected reorderTabs(event: CdkDragDrop<string[]>)
    {
        if (!this.tabsControls)
        {
            return;
        }
 
        moveItemInArray(this.tabsControls, event.previousIndex, event.currentIndex);
        this.tabsControl?.updateValueAndValidity();
      }
}
