import {Observable} from 'rxjs';

/**
 * Service used for managing state of metadata
 */
export class MetadataHistoryManager<TMetadata = any>
{
    //######################### protected properties #########################

    protected _activeIndex: number = 0;

    //######################### public properties #########################

    public canUndo: boolean = false;

    public canRedo: boolean = false;

    public saved: boolean = false;

    public pop!: Observable<TMetadata>;

    //######################### public methods #########################
    public undo(): void
    {
    }

    public redo(): void
    {
    }

    public getNewState(): void
    {
    }

    public clean(): void
    {
    }

    public enable(): void
    {

    }

    public disable(): void
    {
        
    }
}