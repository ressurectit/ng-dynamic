import {Component, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RelationNodePointBase} from '../nodePointBase';

/**
 * Component used to display relation node output
 */
@Component(
{
    selector: 'relation-node-output',
    template: '',
    styleUrls: ['output.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationNodeOutputSAComponent extends RelationNodePointBase
{
    //######################### protected methods - host listeners #########################

    /**
     * Mouse down event
     * @param event 
     */
    @HostListener('mousedown', ['$event'])
    protected _onMouseDown(event: DragEvent): void
    {
        event.stopImmediatePropagation();
        event.preventDefault();

        this._isDragging = true;
        this._lastMouseDownPosition = {
            x: event.clientX,
            y: event.clientY
        };

        //TODO add relations logic
    }

    /**
     * Mouse move event - whole window
     * @param event 
     */
    @HostListener('window:mousemove', ['$event'])
    protected _onMouseMove(event: DragEvent): void
    {
        if (this._isDragging)
        {
            event.stopImmediatePropagation();
            event.preventDefault();

            //TODO add relations logic
        }
    }

    /**
     * Mouse up event - whole window
     * @param event 
     */
    @HostListener('window:mouseup', ['$event'])
    protected _onMouseUp(event: DragEvent): void
    {
        if (this._isDragging)
        {
            this._isDragging = false;
            event.stopImmediatePropagation();
            event.preventDefault();

            //TODO add relations logic
        }
    }
}