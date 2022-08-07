import {Injectable} from '@angular/core';
import {distinctUntilChanged, Observable, Subject} from 'rxjs';

import {DropPlaceholderPreview, DropTargetData} from './dndBus.interface';

/**
 * Service that serves as communication bus for dnd
 */
@Injectable()
export class DndBusService
{
    //######################### protected fields #########################
    
    /**
     * Used for emitting drop data changes
     */
    protected dropDataChangeSubject: Subject<DropTargetData> = new Subject<DropTargetData>();

    /**
     * Current value of drop placeholder preview
     */
    protected dropPlaceholderPreview: DropPlaceholderPreview|null = null;

    /**
     * Used for emitting when new drop placeholder preview should be displayed
     */
    protected newDropPlaceholderPreviewSubject: Subject<DropPlaceholderPreview> = new Subject<DropPlaceholderPreview>();

    /**
     * Used for emitting when old drop placeholder preview should be removed
     */
    protected oldDropPlaceholderPreviewSubject: Subject<DropPlaceholderPreview> = new Subject<DropPlaceholderPreview>();
    
    //######################### public properties #########################
    
    /**
     * Occurs when drop data changes
     */
    public get dropDataChange(): Observable<DropTargetData>
    {
        return this.dropDataChangeSubject.asObservable();
    }

    /**
     * Occurs when new drop placeholder preview should be displayed
     */
    public get newDropPlaceholderPreviewChange(): Observable<DropPlaceholderPreview>
    {
        return this.newDropPlaceholderPreviewSubject
            .asObservable()
            .pipe(distinctUntilChanged((curr, prev) => curr.parentId === prev.parentId && curr.index === prev.index));
    }

    /**
     * Occurs when old drop placeholder preview should be removed
     */
    public get oldDropPlaceholderPreviewChange(): Observable<DropPlaceholderPreview>
    {
        return this.oldDropPlaceholderPreviewSubject
            .asObservable()
            .pipe(distinctUntilChanged((curr, prev) => curr.parentId === prev.parentId && curr.index === prev.index));
    }
    
    //######################### public methods #########################
    
    /**
     * Sets drop data new value
     * @param data - Value of data that changed
     */
    public setDropData(data: DropTargetData): void
    {
        this.dropDataChangeSubject.next(data);
    }

    /**
     * Sets drop placeholder preview
     * @param data - Data for new drop placeholder preview
     */
    public setDropPlaceholderPreview(data: DropPlaceholderPreview|null): void
    {
        if(this.dropPlaceholderPreview)
        {
            this.oldDropPlaceholderPreviewSubject.next(this.dropPlaceholderPreview);
        }

        this.dropPlaceholderPreview = data;

        if(this.dropPlaceholderPreview)
        {
            this.newDropPlaceholderPreviewSubject.next(this.dropPlaceholderPreview);
        }
    }
}