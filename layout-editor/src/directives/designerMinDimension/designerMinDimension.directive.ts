import {ContentChild, Directive, ElementRef, EmbeddedViewRef, OnDestroy, OnInit} from '@angular/core';
import {LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {Subscription} from 'rxjs';

/**
 * Applies min dimensions to designed element, so it can be visible event when it is empty
 */
@Directive(
{
    selector: '[designerMinWidth]',
    standalone: true
})
export class DesignerMinDimensionSADirective implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Instance of resize observer
     */
    protected _observer?: ResizeObserver;

    /**
     * Subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

    /**
     * Instance of layout component renderer
     */
    @ContentChild(LayoutComponentRendererSADirective, {static: true})
    protected _layoutComponentRendererDirective?: LayoutComponentRendererSADirective;

    //######################### constructor #########################
    constructor(protected _element: ElementRef<HTMLElement>,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._observer = new ResizeObserver(changes =>
        {
            for(const change of changes)
            {
                this._updatedDimensions(change.contentRect);
            }
        });

        this._initSubscriptions.add(this._layoutComponentRendererDirective?.componentChange.subscribe(componentRef =>
        {
            if(!componentRef)
            {
                this._observer?.disconnect();

                return;
            }

            const element = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

            this._updatedDimensions(element.getBoundingClientRect());

            this._observer?.observe(element);
        }));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._observer?.disconnect();
        this._initSubscriptions.unsubscribe();
    }

    //######################### protected methods #########################

    protected _updatedDimensions(rect: DOMRect): void
    {
        //no height, apply min height

        if(rect.height != 30)
        {
            if(rect.height <= 0)
            {
                this._element.nativeElement.style.minHeight = '30px';
            }
            else
            {
                this._element.nativeElement.style.minHeight = '';
            }
        }

        if(rect.width != 30)
        {
            //no width, apply min width
            if(rect.width <= 0)
            {
                this._element.nativeElement.style.minWidth = '30px';
            }
            else
            {
                this._element.nativeElement.style.minWidth = '';
            }
        }
    }
}