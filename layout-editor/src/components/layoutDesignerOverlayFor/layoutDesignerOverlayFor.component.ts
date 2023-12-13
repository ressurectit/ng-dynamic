import {Component, ChangeDetectionStrategy, ElementRef, EmbeddedViewRef, OnInit, OnDestroy, Input, ChangeDetectorRef, Inject} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';
import {Subscription} from 'rxjs';

import {LayoutEditorRenderer, LiveEventService} from '../../services';

/**
 * Component displaying layout designer layout overlay
 */
@Component(
{
    selector: '[layoutDesignerOverlayFor]',
    templateUrl: 'layoutDesignerOverlayFor.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDesignerOverlayForSAComponent implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Instance of mutation observer
     */
    protected observer?: MutationObserver;

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    //######################### protected properties #########################

    /**
     * Gets component id safely
     */
    protected get componentIdSafe(): string
    {
        if(!this.componentId)
        {
            throw new Error('LayoutDesignerOverlayForSAComponent: missing id of component!');
        }

        return this.componentId;
    }

    //######################### protected properties - template bindings #########################

    /**
     * Instance of element that is monitored
     */
    protected htmlElement: HTMLElement|undefined;

    //######################### public properties - inputs #########################

    /**
     * Id of component that is being rendered
     */
    @Input('layoutDesignerOverlayFor')
    public componentId: string|undefined|null;

    //######################### constructor #########################
    constructor(protected element: ElementRef<HTMLElement>,
                protected changeDetector: ChangeDetectorRef,
                protected liveEvents: LiveEventService,
                protected renderer: LayoutEditorRenderer,
                @Inject(LOGGER) protected logger: Logger,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.observer = new MutationObserver(() => this.changeDetector.detectChanges());

        const rendererItem = this.renderer.get(this.componentIdSafe);

        if(!rendererItem)
        {
            throw new Error('LayoutDesignerOverlayForSAComponent: missing registered component!');
        }

        this.logger.verbose('LayoutDesignerOverlayForSAComponent: registering component for layout designer overlay');

        this.htmlElement = (rendererItem.component?.hostView as EmbeddedViewRef<unknown>)?.rootNodes?.[0];

        if(this.htmlElement)
        {
            this.observer?.observe(this.htmlElement, {attributeFilter: ['style']});
        }

        this.initSubscriptions.add(this.liveEvents.enabledChange.subscribe(() => this.toggleLiveEvents()));
        this.toggleLiveEvents();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.observer?.disconnect();
        this.initSubscriptions.unsubscribe();
    }

    //######################### protected methods #########################

    /**
     * Toggles live events for element
     */
    protected toggleLiveEvents(): void
    {
        if(this.liveEvents.enabled)
        {
            this.element.nativeElement.style.pointerEvents = 'none';
        }
        else
        {
            this.element.nativeElement.style.pointerEvents = 'all';
        }
    }
}