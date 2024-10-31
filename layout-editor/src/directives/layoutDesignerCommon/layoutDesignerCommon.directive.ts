import {Directive, ElementRef, inject, Injector} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';

import {LayoutDesignerEditorMetadataDirective} from '../layoutDesignerEditorMetadata/layoutDesignerEditorMetadata.directive';
import {LayoutDesignerDirective} from '../layoutDesigner/layoutDesigner.directive';
import {LayoutEditorMetadataManager} from '../../services';

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

    /**
     * Instance of layout designer component
     */
    protected ɵdesigner: LayoutDesignerDirective|undefined|null;

    /**
     * Instance of angular injector
     */
    protected ɵinjector: Injector = inject(Injector);

    /**
     * Instance of layout editor manager
     */
    protected ɵlayoutEditorManager: LayoutEditorMetadataManager = inject(LayoutEditorMetadataManager);

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
    
    /**
     * Gets instance of layout designer component
     */
    public get designer(): LayoutDesignerDirective
    {
        return (this.ɵdesigner ??= this.injector.get(LayoutDesignerDirective));
    }

    /**
     * Instance of angular injector
     */
    public get injector(): Injector
    {
        return this.ɵinjector;
    }

    /**
     * Instance of layout editor manager
     */
    public get layoutEditorManager(): LayoutEditorMetadataManager
    {
        return this.ɵlayoutEditorManager;
    }
}