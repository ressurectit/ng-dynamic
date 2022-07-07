import {Component, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RelationNodePointBase} from '../nodePointBase';

/**
 * Component used to display relation node input
 */
@Component(
{
    selector: 'relation-node-input',
    template: '',
    styleUrls: ['input.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationNodeInputSAComponent extends RelationNodePointBase
{
    //######################### protected methods - host listeners #########################

    /**
     * Mouse down event
     * @param event 
     */
    @HostListener('mousedown', ['$event'])
    protected _onMouseDown(event: MouseEvent): void
    {
        event.stopImmediatePropagation();
        event.preventDefault();

        this._lastMouseDownPosition = {
            x: event.clientX,
            y: event.clientY
        };
        this._isDragging = true;
    }

    /**
     * Mouse move event on whole window
     * @param event 
     */
    @HostListener('window:mousemove', ['$event'])
    protected _onMouseMove(event: MouseEvent): void
    {
        if (this._isDragging)
        {
            event.stopImmediatePropagation();
            event.preventDefault();

            //TODO relations logic
        }
    }

    /**
     * Mouse up event on whole window
     * @param event 
     */
    @HostListener('window:mouseup', ['$event'])
    protected _onMouseUp(event: MouseEvent): void
    {
        if (this._isDragging)
        {
            this._isDragging = false;
            event.stopImmediatePropagation();
            event.preventDefault();

            //TODO relations logic
        }
    }
}