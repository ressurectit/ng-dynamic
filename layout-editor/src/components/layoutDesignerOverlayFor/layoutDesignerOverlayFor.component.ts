import {Component, ChangeDetectionStrategy, ElementRef, EmbeddedViewRef, OnInit, OnDestroy, Input, ChangeDetectorRef} from '@angular/core';
import {LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {Subscription} from 'rxjs';

import {LiveEventService} from '../../services';

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

    //######################### protected properties - template bindings #########################

    /**
     * Instance of element that is monitored
     */
    protected htmlElement: HTMLElement|undefined;

    //######################### public properties - inputs #########################

    /**
     * Instance of layout component renderer
     */
    @Input('layoutDesignerOverlayFor')
    public layoutComponentRendererDirective?: LayoutComponentRendererSADirective;

    //######################### constructor #########################
    constructor(protected element: ElementRef<HTMLElement>,
                protected changeDetector: ChangeDetectorRef,
                protected liveEvents: LiveEventService,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.observer = new MutationObserver(() => this.changeDetector.detectChanges());

        //TODO: make this working, use existing html element
        this.htmlElement = (this.layoutComponentRendererDirective?.componentRef?.hostView as EmbeddedViewRef<any>)?.rootNodes?.[0];

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