import {Directive, inject} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {LayoutEditorMetadataExtractor} from '../../services';
import {LayoutEditorMetadataDescriptor} from '../../decorators';

/**
 * Directive that is used for accessing editor metadata for component
 */
@Directive(
{
    selector: '[layoutDesignerEditorMetadata]',
    standalone: true,
})
export class LayoutDesignerEditorMetadataDirective
{
    //######################### protected fields #########################

    /**
     * Instance of service used for obtaining layout editor metadata
     */
    protected metadataExtractor: LayoutEditorMetadataExtractor = inject(LayoutEditorMetadataExtractor);

    /**
     * Layout editor metadata
     */
    protected ɵeditorMetadata: LayoutEditorMetadataDescriptor|null = null;

    /**
     * Indication whether item can be dropped here
     */
    protected ɵcanDrop: boolean = false;

    /**
     * Indication whether drop list is horizontally oriented
     */
    protected ɵhorizontal: boolean = false;

    /**
     * Instance of layout component metadata
     */
    protected layoutComponentMetadata: LayoutComponentMetadata|undefined|null;

    //######################### protected properties #########################

    /**
     * Gets instance of layout component metadata safely
     */
    protected get layoutComponentMetadataSafe(): LayoutComponentMetadata
    {
        if(!this.layoutComponentMetadata)
        {
            throw new Error('LayoutDesignerEditorMetadataDirective: missing metadata!');
        }

        return this.layoutComponentMetadata;
    }

    //######################### public properties #########################

    /**
     * Gets layout editor metadata
     */
    public get metadata(): LayoutEditorMetadataDescriptor|null
    {
        return this.ɵeditorMetadata;
    }

    /**
     * Gets indication whether item can be dropped here
     */
    public get canDrop(): boolean
    {
        return this.ɵcanDrop;
    }

    /**
     * Gets indication whether drop list is horizontally oriented
     */
    public get horizontal(): boolean
    {
        return this.ɵhorizontal;
    }

    //######################### public methods #########################

    /**
     * Initialize editor metadata for rendered component
     * @param metadata - Metadata of rendered component
     */
    public async initialize(metadata: LayoutComponentMetadata): Promise<void>
    {
        this.layoutComponentMetadata = metadata;
        //TODO: SCOPE: use parent scope for settings this
        // options.typeMetadata.scope = this.scopeId;

        this.ɵeditorMetadata = await this.metadataExtractor.extractMetadata(metadata);
        this.updateCanDrop();
    }

    /**
     * Updates can drop value
     */
    public updateCanDrop(): void
    {
        this.ɵcanDrop =this.metadata?.canDropMetadata?.(this.layoutComponentMetadataSafe.options) ?? false;
    }
}