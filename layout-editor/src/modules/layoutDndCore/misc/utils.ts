import {Injector} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {POSITION, PositionPlacement} from '@anglr/common';
import {DropTarget} from '@ng-dnd/core';
import {Subscription} from 'rxjs';

import {LayoutDragItem, LayoutDropResult} from '../directives';
import {LayoutComponentDragData} from '../../../interfaces';

/**
 * Registers dropzone overlay for hover
 * @param dropzone - Instance of dropzone drop target
 * @param element - Html element that represents drop zone
 * @param injector - Angular injector used for obtaining dependencies
 * @param data - Data that are part of dropzone
 */
export function registerDropzoneOverlay(dropzone: DropTarget<LayoutDragItem, LayoutDropResult>, element: HTMLElement, injector: Injector, data: LayoutComponentDragData): Subscription
{
    const observable = dropzone.listen(monitor => ({isOver: monitor.isOver({shallow: true})}));
    let overlayDiv: HTMLDivElement|null = null;
    const document = injector.get(DOCUMENT);
    const position = injector.get(POSITION);
    let subscription: Subscription|null = null;

    const destroy = () =>
    {
        subscription?.unsubscribe();
        subscription = null;
        overlayDiv?.remove();
        overlayDiv = null;
    };

    return observable.subscribe({
                                    next: itm =>
                                    {
                                        if(itm.isOver)
                                        {
                                            const rect = element.getBoundingClientRect();
                                            overlayDiv = document.createElement('div');
                                            const titleDiv = document.createElement('div');
                                            titleDiv.innerText = `ID: ${data.metadata?.id} NAME: ${data.metadata?.name} PACKAGE: ${data.metadata?.package}`;

                                            overlayDiv.append(titleDiv);
                                            document.body.append(overlayDiv);
                                
                                            overlayDiv.classList.add('dropzone-overlay');
                                            
                                            subscription = position.placeElement(overlayDiv, element, {autoUpdate: true, placement: PositionPlacement.TopStart}).subscribe(() =>
                                            {
                                                if(overlayDiv)
                                                {
                                                    const rect = element.getBoundingClientRect();

                                                    overlayDiv.style.top = `${rect.y}px`;
                                                }
                                            });
                                            
                                            overlayDiv.style.left = `${rect.left}px`;
                                            overlayDiv.style.width = `${rect.width}px`;
                                            overlayDiv.style.height = `${rect.height}px`;
                                        }
                                        else
                                        {
                                            destroy();
                                        }
                                    },
                                    complete: destroy
                                });
}
