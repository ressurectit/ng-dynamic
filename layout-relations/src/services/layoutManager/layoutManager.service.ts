import {Injectable} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Observable, Subject} from 'rxjs';
import isEqual from 'lodash-es/isEqual';
import {cloneDeep} from 'lodash-es';

/**
 * Manager of layout metadata
 */
@Injectable()
export class LayoutManager
{
    //######################### protected fields #########################
    
    /**
     * Current layout value
     */
    protected _layout: LayoutComponentMetadata|null = null;
    
    /**
     * Used for emitting layout changes
     */
    protected _layoutChange: Subject<void> = new Subject<void>();
    
    //######################### public properties #########################
    
    /**
     * Gets current layout value
     */
    public get layout(): LayoutComponentMetadata|null
    {
        return this._layout;
    }
    
    /**
     * Occurs when layout changes
     */
    public get layoutChange(): Observable<void>
    {
        return this._layoutChange.asObservable();
    }
    
    //######################### public methods #########################
    
    /**
     * Sets layout new value
     * @param layout - Value of layout that changed
     */
    public setLayout(layout: LayoutComponentMetadata|null): void
    {
        if(isEqual(this._layout, layout))
        {
            return;
        }
    
        this._layout = cloneDeep(layout);
        this._layoutChange.next();
    }
}