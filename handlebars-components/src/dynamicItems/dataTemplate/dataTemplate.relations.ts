import {SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';
import Handlebars from 'handlebars';

import {DataTemplateRelationsMetadataLoader} from './dataTemplate.metadata';
import {DataTemplateRelationsOptions} from './dataTemplate.options';

/**
 * Data template relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(DataTemplateRelationsMetadataLoader)
export class DataTemplateRelations implements RelationsComponent<DataTemplateRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: DataTemplateRelationsOptions|undefined|null;

    /**
     * Instance of compiled template
     */
    protected compiledTemplate: HandlebarsTemplateDelegate|undefined|null;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): DataTemplateRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: DataTemplateRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;

        if(this.ɵRelationsOptions?.template)
        {
            this.template = this.ɵRelationsOptions?.template;
            this.compiledTemplate = Handlebars.compile(this.template ?? '');
            this.output = this.compiledTemplate(this.data) ?? '';
        }
    }

    //######################### public properties - inputs #########################
    
    /**
     * Data for template rendering
     */
    public data: any;

    /**
     * Template to be used for rendering of data
     */
    public template: string|undefined|null;

    //######################### public properties - dynamic outputs #########################

    /**
     * Output of template compilation
     */
    @DynamicOutput()
    public output: string|undefined|null;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<DataTemplateRelations>('template') in changes)
        {
            this.compiledTemplate = Handlebars.compile(this.template ?? '');

            this.output = this.compiledTemplate(this.data);
        }

        if(nameof<DataTemplateRelations>('data') in changes)
        {
            this.output = this.compiledTemplate?.(this.data) ?? '';
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}