import {Component, ChangeDetectionStrategy, SimpleChanges, Input} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {nameof} from '@jscrpt/common';
import Handlebars from 'handlebars';

import {DataBlockComponentOptions} from './dataBlock.options';
import {DataBlockLayoutMetadataLoader, DataBlockRelationsMetadataLoader} from './dataBlock.metadata';

/**
 * Component used for displaying data block
 */
@Component(
{
    selector: 'data-block',
    template: '',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(DataBlockRelationsMetadataLoader)
@LayoutEditorMetadata(DataBlockLayoutMetadataLoader)
export class DataBlockSAComponent extends LayoutComponentBase<DataBlockComponentOptions> implements LayoutComponent<DataBlockComponentOptions>, RelationsComponent
{
    //######################### protected properties #########################

    /**
     * Instance of compiled template
     */
    protected compiledTemplate: HandlebarsTemplateDelegate|undefined|null;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;

    //######################### public properties - inputs #########################

    /**
     * Instance of data to be set to template
     */
    @Input()
    public data: any;

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public override async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        await super.ngOnChanges(changes);

        if(nameof<DataBlockSAComponent>('data') in changes)
        {
            this._element.nativeElement.innerHTML = this.compiledTemplate?.(this.data) ?? '';
        }
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override _onOptionsSet(): void
    {
        if(!this._initialized)
        {
            return;
        }

        if(this.options?.template)
        {
            this.compiledTemplate = Handlebars.compile(this.options.template);
        }

        this._element.nativeElement.innerHTML = this.compiledTemplate?.(this.data) ?? '';
    }
}