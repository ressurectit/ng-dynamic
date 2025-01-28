import {Component, ChangeDetectionStrategy, SimpleChanges, Input} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {nameof} from '@jscrpt/common';
import Handlebars from 'handlebars';

import {DataBlockComponentOptions} from './dataBlock.options';
import {DataBlockLayoutDesignerTypeLoader, DataBlockLayoutMetadataLoader, DataBlockRelationsMetadataLoader} from './dataBlock.metadata';

/**
 * Component used for displaying data block
 */
@Component(
{
    selector: 'data-block',
    template: '',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorDesignerType(DataBlockLayoutDesignerTypeLoader)
@RelationsEditorMetadata(DataBlockRelationsMetadataLoader)
@LayoutEditorMetadata(DataBlockLayoutMetadataLoader)
export class DataBlockComponent extends LayoutComponentBase<DataBlockComponentOptions> implements LayoutComponent<DataBlockComponentOptions>, RelationsComponent
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
    public override async dynamicOnChanges(changes: SimpleChanges): Promise<void>
    {
        await super.dynamicOnChanges(changes);

        if(nameof<DataBlockComponent>('data') in changes)
        {
            this.componentElement.nativeElement.innerHTML = this.compiledTemplate?.(this.data) ?? '';
        }
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        //TODO: check if required
        // if(!this.initialized)
        // {
        //     return;
        // }

        if(this.options?.template)
        {
            this.compiledTemplate = Handlebars.compile(this.options.template);
        }

        this.componentElement.nativeElement.innerHTML = this.compiledTemplate?.(this.data) ?? '';
    }
}