import {Injectable, NgZone, OnDestroy, Renderer2, inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {POSITION, Position, PositionPlacement, applyPositionResult} from '@anglr/common';
import {renderToBody} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {DropTarget} from '@ng-dnd/core';
import {Subscription} from 'rxjs';

import {DndBusService} from '../dndBus/dndBus.service';
import type {LayoutDragItem, LayoutDropResult} from '../../directives';

/**
 * Class that applies css style update to element
 */
class CssStyleUpdates
{
    //######################### private fields #########################

    /**
     * Margin side that is set
     */
    private _marginSide: string;

    //######################### constructor #########################
    constructor(private _element: Element,
                private _before: boolean,
                private _requiredSpace: number,
                private _renderer: Renderer2,
                private _horizontal: boolean,)
    {
        this._marginSide = this._horizontal ? (this._before ? 'Left' : 'Right') : (this._before ? 'Top' : 'Bottom');

        this.apply();
    }

    //######################### public methods #########################

    /**
     * Destroyes css update and removes changes applied to element
     */
    public destroy(): void
    {
        this._renderer.setStyle(this._element, `margin${this._marginSide}`, null);
    }

    //######################### private methods #########################

    /**
     * Applies css changes to element
     */
    private apply(): void
    {
        this._renderer.setStyle(this._element, `margin${this._marginSide}`, `${this._requiredSpace}px`);
    }
}

/**
 * Service used for rendering placeholder
 */
@Injectable()
export class PlaceholderRenderer implements OnDestroy
{
    //######################### protected properties #########################

    /**
     * Instance of HTML element
     */
    protected placeholderElement: HTMLElement|undefined|null;

    /**
     * Instance of dnd bus service
     */
    protected dndBus: DndBusService = inject(DndBusService);

    /**
     * NgZone instance
     */
    protected ngZone: NgZone = inject(NgZone);

    /**
     * Instance of renderer used for DOM manipulation
     */
    protected renderer: Renderer2 = inject(Renderer2);

    /**
     * Instance of position plugin
     */
    protected position: Position = inject(POSITION);

    /**
     * Instance of html document
     */
    protected document: Document = inject(DOCUMENT);

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Subscription for placeholder connection to DOM
     */
    protected placeholderConnection: Subscription|undefined|null;

    /**
     * Css update applied to before element
     */
    protected cssUpdateBefore: CssStyleUpdates|undefined|null;

    /**
     * Css update applied to after element
     */
    protected cssUpdateAfter: CssStyleUpdates|undefined|null;

    /**
     * Safely gets placeholder element
     */
    protected get placeholderElementSafe(): HTMLElement
    {
        if(!this.placeholderElement)
        {
            throw new Error('PlaceholderRenderer: missing placeholder element');
        }

        return this.placeholderElement;
    }

    //######################### constructor #########################
    constructor()
    {
        this.initSubscriptions.add(this.dndBus.oldDropPlaceholderPreviewChange.subscribe(() => this.removePlaceholder()));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();

        this.removePlaceholder();
    }

    //######################### public methods #########################

    /**
     * Renders placeholder
     * @param containerElement - Container element that will display new placeholder
     * @param index - Index at which should be placeholder displayed
     * @param placeholderDrop - Placeholder drop that should be connnected to placeholder element
     * @param horizontal - Indication whether is container element horizontaly displaying children
     */
    public async renderPlaceholder(containerElement: Element, index: number, placeholderDrop: DropTarget<LayoutDragItem, LayoutDropResult>, horizontal: boolean): Promise<void>
    {
        this.createPlaceholder(placeholderDrop, containerElement, horizontal);

        //empty container or first place in container
        if(!containerElement.children.length || index == 0)
        {
            this.applyPosition(containerElement, -6, horizontal ? PositionPlacement.LeftStart : PositionPlacement.TopStart);

            let firstItem = containerElement.children.item(0);

            //empty container
            if(!firstItem)
            {
                return;
            }

            //node name is display content so use its first child
            if(firstItem?.nodeName == 'LAYOUT-DESIGNER-COMPONENT')
            {
                firstItem = firstItem.firstElementChild;
            }

            if(!firstItem)
            {
                throw new Error('PlaceholderRenderer: missing element!');
            }
            
            this.cssUpdateAfter = new CssStyleUpdates(firstItem, true, 6, this.renderer, horizontal);
        }
        //last place in container
        else if(!containerElement.children.item(index))
        {
            let lastItem = containerElement.children.item(index - 1);

            //node name is display content so use its first child
            if(lastItem?.nodeName == 'LAYOUT-DESIGNER-COMPONENT')
            {
                lastItem = lastItem.firstElementChild;
            }

            if(!lastItem)
            {
                throw new Error('PlaceholderRenderer: missing element!');
            }
            
            this.cssUpdateAfter = new CssStyleUpdates(lastItem, false, 6, this.renderer, horizontal);
            this.applyPosition(lastItem, 0, horizontal ? PositionPlacement.RightStart : PositionPlacement.BottomStart);
        }
        //any other place in container
        else
        {
            let lastItem = containerElement.children.item(index);
            let beforeLastItem = containerElement.children.item(index - 1);

            //node name is display content so use its first child
            if(lastItem?.nodeName == 'LAYOUT-DESIGNER-COMPONENT')
            {
                lastItem = lastItem.firstElementChild;
            }

            //node name is display content so use its first child
            if(beforeLastItem?.nodeName == 'LAYOUT-DESIGNER-COMPONENT')
            {
                beforeLastItem = beforeLastItem.firstElementChild;
            }

            if(!lastItem || !beforeLastItem)
            {
                throw new Error('PlaceholderRenderer: missing element!');
            }
            
            this.cssUpdateAfter = new CssStyleUpdates(beforeLastItem, false, 3, this.renderer, horizontal);
            this.cssUpdateBefore = new CssStyleUpdates(lastItem, true, 3, this.renderer, horizontal);
            this.applyPosition(lastItem, 0, horizontal ? PositionPlacement.LeftStart : PositionPlacement.TopStart);
        }
    }

    //######################### protected methods #########################

    /**
     * Creates placeholder element and connects it to placeholder drop
     * @param placeholderDrop - Placeholder drop that should be connnected to placeholder element
     * @param containerElement - Container element that will display new placeholder
     * @param horizontal - Indication whether is container element horizontaly displaying children
     */
    protected createPlaceholder(placeholderDrop: DropTarget<LayoutDragItem>, containerElement: Element, horizontal: boolean): void
    {
        this.placeholderElement = this.renderer.createElement('div');
        this.renderer.addClass(this.placeholderElement, 'layout-placeholder');

        const rect = containerElement.getBoundingClientRect();
        this.renderer.setStyle(this.placeholderElementSafe, horizontal ? 'height' : 'width', `${horizontal ? rect.height : rect.width}px`);

        renderToBody(this.document, this.placeholderElementSafe);

        this.ngZone.runOutsideAngular(() =>
        {
            this.placeholderConnection?.unsubscribe();

            if(this.placeholderElement)
            {
                this.placeholderConnection = placeholderDrop.connectDropTarget(this.placeholderElement);
            }
        });
    }

    /**
     * Removes placeholder and all changes
     */
    protected removePlaceholder(): void
    {
        this.placeholderElement?.remove();
        this.placeholderElement = null;

        this.placeholderConnection?.unsubscribe();
        this.placeholderConnection = null;

        this.cssUpdateBefore?.destroy();
        this.cssUpdateBefore = null;

        this.cssUpdateAfter?.destroy();
        this.cssUpdateAfter = null;
    }

    /**
     * Applies position to placeholder
     * @param element - Element to be positioned
     * @param offset - Offset that will be applied
     * @param placement - Placement to be used
     */
    protected async applyPosition(element: Element, offset: number, placement: PositionPlacement): Promise<void>
    {
        //original placeholder element when applying changes
        const placeholderElement = this.placeholderElement;

        const result = await lastValueFrom(this.position.placeElement(this.placeholderElementSafe, element, {placement, offset: {mainAxis: offset}}));

        //element was already removed, or changed
        if(this.placeholderElement != placeholderElement || !result)
        {
            return;
        }

        applyPositionResult(result);
    }
}