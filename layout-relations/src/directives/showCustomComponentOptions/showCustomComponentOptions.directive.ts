import {Directive, ElementRef, HostListener, Injector, Input, OnChanges, OnInit} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {TitledDialogService} from '@anglr/common/material';
import {LayoutEditorPropertyMetadataExtractor} from '@anglr/dynamic/layout-editor';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {Dictionary} from '@jscrpt/common';

import {ContentComponentData, CustomComponentOptionsData, CustomComponentOptionsSAComponent} from '../../components';
import {getCustomComponentMeta} from '../../misc/utils';
import {CustomComponentConfiguration, CustomComponentsRegister} from '../../services';

/**
 * Directive that is used for displaying custom component options
 */
@Directive(
{
    selector: '[showCustomComponentOptions]',
    standalone: true,
})
export class ShowCustomComponentOptionsSADirective<TConfig extends CustomComponentConfiguration = CustomComponentConfiguration> implements OnInit, OnChanges
{
    //######################### protected properties #########################

    /**
     * Metadata for each component in custom component
     */
    protected customComponentContentMetadata: Dictionary<ContentComponentData|undefined|null> = {};

    /**
     * Custom component layout metadata
     */
    protected customComponentMetadata: LayoutComponentMetadata|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Name of custom component which will be edited
     */
    @Input('showCustomComponentOptions')
    public name: string|undefined|null;

    //######################### constructor #########################
    constructor(protected injector: Injector,
                protected dialogSvc: TitledDialogService,
                protected customComponentsRegister: CustomComponentsRegister<TConfig>,
                protected propsMetadataExtractor: LayoutEditorPropertyMetadataExtractor,
                protected element: ElementRef<HTMLButtonElement>,)
    {
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public async ngOnChanges(): Promise<void>
    {
        if(!this.name)
        {
            return;
        }

        const result = (await getCustomComponentMeta(this.name, this.injector));

        if(!result)
        {
            return;
        }

        this.customComponentContentMetadata = result.contentMetadata;
        this.customComponentMetadata = result.metadata;
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        if(!this.name && !this.element.nativeElement.disabled)
        {
            throw new Error('Please provide name of custom component for its options');
        }
    }
    
    //######################### protected methods - host #########################

    /**
     * Shows content options selection dialog
     * @param event - Event that occured
     */
    @HostListener('click', ['$event'])
    protected async show(event: MouseEvent): Promise<void>
    {
        event.preventDefault();
        event.stopPropagation();
        
        const result = await lastValueFrom(this.dialogSvc.open<CustomComponentOptionsSAComponent, CustomComponentOptionsData, TConfig|undefined|null>(CustomComponentOptionsSAComponent,
        {
            title: 'custom component options',
            width: '75vw',
            data:
            {
                customComponentContentMetadata: this.customComponentContentMetadata,
                configuration: await this.customComponentsRegister.getConfigurationForComponent(this.name ?? '') ?? {},
                propsMetadataExtractor: this.propsMetadataExtractor,
            }
        }).afterClosed());

        if(result)
        {
            await this.customComponentsRegister.setConfigurationForComponent(this.name ?? '', result);
        }
    }
}