import {Directive, ElementRef, inject, Injector} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';

import {LayoutDesignerEditorMetadataDirective} from '../layoutDesignerEditorMetadata/layoutDesignerEditorMetadata.directive';
import {LayoutDesignerDirective} from '../layoutDesigner/layoutDesigner.directive';
import {DndBusService, DragActiveService, LayoutEditorMetadataManager} from '../../services';

/**
 * Directive for shared properties among all layout designer directives
 */
@Directive(
{
    selector: '[layoutDesignerCommon]',
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
    protected ɵeditorMetadata: LayoutDesignerEditorMetadataDirective|undefined|null;

    /**
     * Instance of layout designer component
     */
    protected ɵdesigner: LayoutDesignerDirective|undefined|null;

    /**
     * Instance of angular injector
     */
    protected ɵinjector: Injector = inject(Injector);

    /**
     * Service used for obtaining information that 'drag' is active
     */
    protected ɵdraggingSvc: DragActiveService = inject(DragActiveService);

    /**
     * Service used for sharing data during drag n drop
     */
    protected ɵdndBus: DndBusService = inject(DndBusService);

    /**
     * Instance of layout editor manager
     */
    protected ɵlayoutEditorManager: LayoutEditorMetadataManager|undefined|null;

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
        return(this.ɵeditorMetadata ??= this.injector.get(LayoutDesignerEditorMetadataDirective));
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
     * Gets service used for obtaining information that 'drag' is active
     */
    public get draggingSvc(): DragActiveService
    {
        return this.ɵdraggingSvc;
    }

    /**
     * Gets service used for sharing data during drag n drop
     */
    public get dndBus(): DndBusService
    {
        return this.ɵdndBus;
    }

    /**
     * Instance of layout editor manager
     */
    public get layoutEditorManager(): LayoutEditorMetadataManager
    {
        return (this.ɵlayoutEditorManager ??= this.injector.get(LayoutEditorMetadataManager));
    }
}