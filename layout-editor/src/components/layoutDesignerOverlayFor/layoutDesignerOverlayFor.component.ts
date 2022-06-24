import {Component, ChangeDetectionStrategy, ElementRef, EmbeddedViewRef, OnInit, OnDestroy, Input} from '@angular/core';
import {LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {Subscription} from 'rxjs';

/**
 * Component displaying layout designer layout overlay
 */
@Component(
{
    selector: '[layoutDesignerOverlayFor]',
    templateUrl: 'layoutDesignerOverlayFor.component.html',
    styleUrls: ['layoutDesignerOverlayFor.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDesignerOverlayForSAComponent implements OnInit, OnDestroy
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

    //######################### protected properties - template bindings #########################

    /**
     * Instance of element that is monitored
     */
    protected _htmlElement: HTMLElement|undefined;

    //######################### public properties - inputs #########################

    /**
     * Instance of layout component renderer
     */
    @Input('layoutDesignerOverlayFor')
    public layoutComponentRendererDirective?: LayoutComponentRendererSADirective;

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
        //TODO: handle changes of styles

        // this._observer = new ResizeObserver(changes =>
        // {
        //     for(const change of changes)
        //     {
        //         //no height, apply min height
        //         if(change.contentRect.height <= 0)
        //         {
        //             this._element.nativeElement.style.minHeight = '30px';
        //         }
        //         else
        //         {
        //             this._element.nativeElement.style.minHeight = '';
        //         }
        //     }
        // });

        // this._initSubscriptions.add(this.layoutComponentRendererDirective?.componentChange.subscribe(componentRef =>
        // {
        //     if(!componentRef)
        //     {
        //         return;
        //     }
        // }));

        this._htmlElement = (this.layoutComponentRendererDirective?.componentRef?.hostView as EmbeddedViewRef<any>)?.rootNodes?.[0];
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