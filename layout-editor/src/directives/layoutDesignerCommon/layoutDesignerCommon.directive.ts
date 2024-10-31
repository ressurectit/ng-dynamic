import {Directive, ElementRef, inject} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';

import {LayoutDesignerEditorMetadataDirective} from '../layoutDesignerEditorMetadata/layoutDesignerEditorMetadata.directive';

/**
 * Directive for shared properties among all layout designer directives
 */
@Directive(
{
    selector: '[layoutDesignerCommon]',
    standalone: true,
})
export class LayoutDesignerCommonDirective
{
    //######################### protected fields #########################

    /**
     * Instance of components element
     */
    protected ɵelement: ElementRef<HTMLElement> = inject(ElementRef);

    /**
     * Instance of logger
     */
    protected ɵlogger: Logger = inject(LOGGER);

    /**
     * Instance of editor medata directive
     */
    protected ɵeditorMetadata: LayoutDesignerEditorMetadataDirective = inject(LayoutDesignerEditorMetadataDirective);

    //######################### public properties #########################
    
    /**
     * Gets instance of components element
     */
    public get element(): ElementRef<HTMLElement>
    {
        return this.ɵelement;
    }

    /**
     * Gets instance of logger
     */
    public get logger(): Logger
    {
        return this.ɵlogger;
    }

    /**
     * Gets instance of editor medata directive
     */
    public get editorMetadata(): LayoutDesignerEditorMetadataDirective
    {
        return this.ɵeditorMetadata;
    }
}