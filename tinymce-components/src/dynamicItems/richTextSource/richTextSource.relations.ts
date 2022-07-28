import {SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {RichTextSourceRelationsMetadataLoader} from './richTextSource.metadata';
import {RichTextSourceRelationsOptions} from './richTextSource.options';

/**
 * Rich text source relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(RichTextSourceRelationsMetadataLoader)
export class RichTextSourceRelations implements RelationsComponent<RichTextSourceRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: RichTextSourceRelationsOptions|undefined|null;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): RichTextSourceRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: RichTextSourceRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;

        if(this.ɵRelationsOptions?.content)
        {
            this.htmlString = this.ɵRelationsOptions.content;
        }
    }

    //######################### public properties - dynamic outputs #########################

    /**
     * Html rich text output
     */
    @DynamicOutput()
    public htmlString: string|undefined|null;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(_changes: SimpleChanges): void
    {
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}