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
        this.createPlaceholder(placeholderDrop, horizontal);
        const rect = containerElement.getBoundingClientRect();
        this.renderer.setStyle(this.placeholderElementSafe, 'width', `${rect.width}px`);

        //empty container
        if(!containerElement.children.length)
        {
            applyPositionResult(await lastValueFrom(this.position.placeElement(this.placeholderElementSafe, containerElement, {offset: {mainAxis: -6}})));
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
            
            applyPositionResult(await lastValueFrom(this.position.placeElement(this.placeholderElementSafe, lastItem, {placement: PositionPlacement.BottomStart})));
        }
        //any other place in container
        else
        {
            let lastItem = containerElement.children.item(index);

            //node name is display content so use its first child
            if(lastItem?.nodeName == 'LAYOUT-DESIGNER-COMPONENT')
            {
                lastItem = lastItem.firstElementChild;
            }

            if(!lastItem)
            {
                throw new Error('PlaceholderRenderer: missing element!');
            }
            
            applyPositionResult(await lastValueFrom(this.position.placeElement(this.placeholderElementSafe, lastItem, {placement: PositionPlacement.TopStart})));
        }
    }

    //######################### protected methods #########################

    protected createPlaceholder(placeholderDrop: DropTarget<LayoutDragItem>, horizontal: boolean): void
    {
        this.placeholderElement = this.renderer.createElement('div');
        this.renderer.addClass(this.placeholderElement, 'layout-placeholder');
        this.renderer.addClass(this.placeholderElementSafe, horizontal ? 'horizontal' : 'vertical');

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

    protected removePlaceholder(): void
    {
        this.placeholderElement?.remove();
        this.placeholderElement = null;

        this.placeholderConnection?.unsubscribe();
        this.placeholderConnection = null;
    }
}