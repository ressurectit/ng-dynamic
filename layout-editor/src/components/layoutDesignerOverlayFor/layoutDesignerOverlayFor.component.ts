import {Component, ChangeDetectionStrategy, ElementRef, EmbeddedViewRef, OnInit, OnDestroy, Input, ChangeDetectorRef} from '@angular/core';
import {LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';

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
    protected _observer?: MutationObserver;

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
    constructor(protected _element: ElementRef<HTMLElement>,
                protected _changeDetector: ChangeDetectorRef,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._observer = new MutationObserver(() => this._changeDetector.detectChanges());

        //TODO: make this working
        this._htmlElement = (this.layoutComponentRendererDirective?.componentRef?.hostView as EmbeddedViewRef<any>)?.rootNodes?.[0];

        if(this._htmlElement)
        {
            this._observer?.observe(this._htmlElement, {attributeFilter: ['style']});
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._observer?.disconnect();
    }
}