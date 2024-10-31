import {Directive, inject} from '@angular/core';

import {LayoutEditorMetadataExtractor} from '../../services';
import {LayoutEditorMetadataDescriptor} from '../../decorators';
import {LayoutDesignerCommonDirective} from '../layoutDesignerCommon/layoutDesignerCommon.directive';

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
     * Instance of common designer directive storing common stuff
     */
    protected common: LayoutDesignerCommonDirective = inject(LayoutDesignerCommonDirective);

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
     */
    public async initialize(): Promise<void>
    {
        //TODO: SCOPE: use parent scope for settings this
        // options.typeMetadata.scope = this.scopeId;

        this.ɵeditorMetadata = await this.metadataExtractor.extractMetadata(this.common.designer.metadataSafe);
        this.updateCanDrop();
    }

    /**
     * Updates can drop value
     */
    public updateCanDrop(): void
    {
        this.ɵcanDrop =this.metadata?.canDropMetadata?.(this.common.designer.metadataSafe.options) ?? false;
    }
}