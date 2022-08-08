import {Directive, EmbeddedViewRef, Inject, NgZone, OnDestroy, OnInit, Optional, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';

import {DragPreviewRegistrator} from '../../interfaces';
import {DRAG_PREVIEW_REGISTRATOR} from '../../misc/tokens';

/**
 * Directive that marks attached element as html 5 drag preview
 */
@Directive(
{
    selector: '[dndCorePreview]'
})
export class DndCorePreviewDirective implements OnInit, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Instance of created template
     */
    protected templateRef: EmbeddedViewRef<void>|undefined|null;

    /**
     * Html element representing contents of template
     */
    protected element: HTMLElement|undefined|null;

    /**
     * Instance of connection to DOM for drag preview
     */
    protected placeholderConnection: Subscription|undefined|null;

    //######################### constructor #########################
    constructor(protected template: TemplateRef<void>,
                protected viewContainer: ViewContainerRef,
                protected ngZone: NgZone,
                @Inject(DRAG_PREVIEW_REGISTRATOR) @Optional() protected dragPreviewRegistrator?: DragPreviewRegistrator,)
    {
        if(!this.dragPreviewRegistrator)
        {
            //TODO: write this error into documentation
            throw new Error('Unable to use DndCorePreviewDirective, becuase there is no drag preview registrator!');
        }
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.templateRef = this.viewContainer.createEmbeddedView(this.template);
        this.element = this.templateRef.rootNodes[0];

        if(this.element)
        {
            document.body.append(this.element);
        }

        this.ngZone.runOutsideAngular(() =>
        {
            if(this.element)
            {
                this.placeholderConnection = this.dragPreviewRegistrator?.registerPreviewElement(this.element);
            }
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.element?.remove();
        this.element = null;

        this.templateRef?.destroy();
        this.templateRef = null;

        this.placeholderConnection?.unsubscribe();
        this.placeholderConnection = null;
    }
}