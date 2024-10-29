import {ComponentRef, Directive, ElementRef, inject, OnDestroy} from '@angular/core';
import {LayoutComponent, LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {BindThis, isDescendant} from '@jscrpt/common';

import {LayoutDesignerOverlayDirective} from '../layoutDesignerOverlay/layoutDesignerOverlay.directive';

/**
 * Directive that is used for rendering all needed for layout designer
 */
@Directive(
{
    selector: '[layoutDesigner]',
    standalone: true,
    hostDirectives:
    [
        LayoutDesignerOverlayDirective,
    ],
})
export class LayoutDesignerDirective<TOptions = unknown> implements OnDestroy
{
    //######################### protected fields #########################

    /**
     * Instance of components element
     */
    protected element: ElementRef<HTMLElement> = inject(ElementRef);

    /**
     * Instance of layout designer directive
     */
    protected overlay: LayoutDesignerOverlayDirective = inject(LayoutDesignerOverlayDirective);

    /**
     * Instance of parent layout designer
     */
    protected parent: LayoutDesignerDirective|undefined|null = inject(LayoutDesignerDirective, {optional: true, skipSelf: true,});

    /**
     * Component reference for which is this designer
     */
    protected component: ComponentRef<LayoutComponent>|undefined|null;

    /**
     * Metadata of rendered component
     */
    protected metadata: LayoutComponentMetadata<TOptions>|undefined|null;

    /**
     * Indication whether is overlay visible
     */
    protected overlayVisible: boolean = false;

    //######################### protected properties #########################

    /**
     * Gets safely component reference for which is this designer
     */
    protected get componentSafe(): ComponentRef<LayoutComponent>
    {
        if(!this.component)
        {
            throw new Error('LayoutDesignerDirective: missing component reference!');
        }

        return this.component;
    }

    /**
     * Gets safely metadata of rendered component
     */
    protected get metadataSafe(): LayoutComponentMetadata<TOptions>
    {
        if(!this.metadata)
        {
            throw new Error('LayoutDesignerDirective: missing component metadata!');
        }

        return this.metadata;
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
        this.element.nativeElement.removeEventListener('mouseover', this.showDesignerOverlay);
        this.element.nativeElement.removeEventListener('mouseleave', this.hideDesignerOverlay);
    }

    //######################### public methods #########################

    /**
     * Initialize designer for rendered component
     * @param component - Component reference for which is this designer initialized
     * @param metadata - Metadata of rendered component
     */
    public initializeDesigner(component: ComponentRef<LayoutComponent>, metadata: LayoutComponentMetadata): void
    {
        this.component = component;
        this.metadata = metadata;

        this.element.nativeElement.addEventListener('mouseover', this.showDesignerOverlay);
        this.element.nativeElement.addEventListener('mouseleave', this.hideDesignerOverlay);
    }

    //######################### protected methods #########################

    /**
     * Shows designer overlay on 'hover'
     * @param event - Event that occured
     */
    @BindThis
    protected showDesignerOverlay(event: MouseEvent): void
    {
        event.stopPropagation();

        if(this.overlayVisible)
        {
            return;
        }

        this.overlayVisible = true;

        this.hideParentOverlay();
        this.overlay.showOverlay(this.metadataSafe.displayName || this.metadataSafe.id);
    }

    /**
     * Hides desiner overlay on 'blur'
     * @param event - Event that occured
     */
    @BindThis
    protected hideDesignerOverlay(event?: MouseEvent|undefined|null): void
    {
        if(event)
        {
            event.stopPropagation();
    
            if(!event.target)
            {
                throw new Error('LayoutDesignerDirective: missing event target!');
            }
    
            if(!this.overlayVisible || isDescendant(this.element.nativeElement, event.target as HTMLElement))
            {
                return;
            }
        }

        this.overlayVisible = false;

        this.overlay.hideOverlay();
    }

    /**
     * Hides all parents overlays
     */
    protected hideParentOverlay(): void
    {
        if(this.parent)
        {
            this.parent.hideParentOverlay();

            if(this.parent.overlayVisible)
            {
                this.parent.hideDesignerOverlay();
            }
        }
    }
}