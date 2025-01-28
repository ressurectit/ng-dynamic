import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Type} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {TitledDialogService} from '@anglr/common/material';
import {LanguageModel, CodeEditorDialogComponent, CodeEditorDialogData, CodeEditorContent} from '@anglr/dynamic';
import {isBlank, isPresent} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {PropertiesControl} from '../../interfaces';
import {PropertiesControlBase} from '../../modules';
import {LayoutEditorMetadataExtractor} from '../../services';

/**
 * Base component used for displaying code properties control
 */
@Component(
{
    selector: 'base-code-properties-control',
    templateUrl: 'codePropertiesControl.component.html',
    imports:
    [
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseCodePropertiesControlComponent<TOptions = any> extends PropertiesControlBase<TOptions> implements PropertiesControl<TOptions>
{
    //######################### public properties - inputs #########################

    /**
     * Name of property that will be set by this component
     */
    @Input()
    public property: string|undefined|null;

    /**
     * Language model to be used in code editor
     */
    @Input()
    public languageModel: LanguageModel|undefined|null;

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                metadataExtractor: LayoutEditorMetadataExtractor,
                protected dialog: TitledDialogService,)
    {
        super(changeDetector, metadataExtractor);
    }

    //######################### protected methods - template bindings #########################

    /**
     * Shows code editor
     */
    protected async showCodeEditor(): Promise<void>
    {
        if(isBlank(this.property) || !this.languageModel)
        {
            return;
        }

        const result = await lastValueFrom(this.dialog.open<CodeEditorDialogComponent, CodeEditorDialogData, CodeEditorContent|null>(CodeEditorDialogComponent,
        {
            title: 'Code editor',
            width: '75vw',
            height: '75vh',
            data: 
            {
                content: this.form?.get(this.property)?.value ?? '',
                languageModel: this.languageModel

            }
        }).afterClosed());

        if(isPresent(result))
        {
            const control = this.form?.get(this.property);

            if(control instanceof FormControl)
            {
                control.setValue(result.content);
            }
        }
    }
}

/**
 * Gets code properties control component for specific property
 * @param property - Name of property that will be set by this component
 * @param languageModel - Language model to be used in code editor
 */
export function codePropertiesControlFor<TModel>(property: Extract<keyof TModel, string>, languageModel: LanguageModel): Type<PropertiesControl>
{
    @Component(
    {
        selector: 'code-properties-control',
        templateUrl: 'codePropertiesControl.component.html',
        imports:
        [
            FirstUppercaseLocalizePipe,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class CodePropertiesControl<TOptions = any> extends BaseCodePropertiesControlComponent implements PropertiesControl<TOptions>
    {
        /**
         * @inheritdoc
         */
        @Input()
        public override property: string|undefined|null = property;

        /**
         * @inheritdoc
         */
        @Input()
        public override languageModel: LanguageModel|undefined|null = languageModel;
    }

    return CodePropertiesControl;
}