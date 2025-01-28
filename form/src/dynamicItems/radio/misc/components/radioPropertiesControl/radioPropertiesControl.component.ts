import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormModelBuilder} from '@anglr/common/forms';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {TitledDialogService} from '@anglr/common/material';
import {LayoutEditorMetadataExtractor, PropertiesControl, PropertiesControlBase} from '@anglr/dynamic/layout-editor';

import {RadioComponentOptions} from '../../../radio.options';
import {RadioOptionModel} from '../../../metadata/radio.model';

/**
 * Component used for displaying material tab group properties control
 */
@Component(
{
    selector: 'radio-properties-control',
    templateUrl: 'radioPropertiesControl.component.html',
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioPropertiesControlComponent extends PropertiesControlBase<RadioComponentOptions> implements PropertiesControl<RadioComponentOptions>
{
    //######################### protected properties #########################

    /**
     * Options control
     */
    protected get optionsControl(): FormArray|null|undefined
    {
        return <FormArray>this.form?.controls.options;
    }

    /**
     * Options control form groups
     */
    protected get optionsControls(): FormGroup[]|null|undefined
    {
        return <FormGroup[]>this.optionsControl?.controls;
    }

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                metadataExtractor: LayoutEditorMetadataExtractor,
                protected dialog: TitledDialogService,
                protected formModelBuilder: FormModelBuilder)
    {
        super(changeDetector, metadataExtractor);
    }

    //######################### protected methods - template bindings #########################

    /**
     * Adds new tab to tab group
     */
    protected async addOption(): Promise<void>
    {
        this.optionsControl?.push(this.formModelBuilder.build(new RadioOptionModel()));
    }

    /**
     * Removes tab on specified index in form array
     * @param index Tab index to remove
     */
    protected removeOption(index: number): void
    {
        this.optionsControl?.removeAt(index);
    }
}
