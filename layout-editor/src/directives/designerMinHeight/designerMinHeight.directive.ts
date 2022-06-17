import {ContentChild, Directive, ElementRef, EmbeddedViewRef, OnDestroy, OnInit} from '@angular/core';
import {LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {Subscription} from 'rxjs';

/**
 * Applies min height to designed element, so it can be visible event when it is empty
 */
@Directive(
{
    selector: '[designerMinHeight]',
    standalone: true
})
export class DesignerMinHeightSADirective implements OnInit, OnDestroy
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
                //no height, apply min height
                if(change.contentRect.height <= 0)
                {
                    this._element.nativeElement.style.minHeight = '14px';
                }
                else
                {
                    this._element.nativeElement.style.minHeight = '';
                }
            }
        });

        this._initSubscriptions.add(this._layoutComponentRendererDirective?.componentChange.subscribe(componentRef =>
        {
            if(!componentRef)
            {
                this._observer?.disconnect();

                return;
            }

            this._observer?.observe((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);
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
}