import {Injectable} from '@angular/core';
import {AppHotkeysService} from '@anglr/common/hotkeys';
import {Hotkey} from 'angular2-hotkeys';
import {Observable, Subject} from 'rxjs';

/**
 * Class that handles hotkeys for editors
 */
@Injectable()
export class EditorHotkeys
{
    //######################### protected properties #########################

    /**
     * Subject used for emitting undo
     */
    protected undoSubject: Subject<void> = new Subject<void>();

    /**
     * Subject used for emitting redo
     */
    protected redoSubject: Subject<void> = new Subject<void>();

    /**
     * Subject used for emitting new
     */
    protected newSubject: Subject<void> = new Subject<void>();

    /**
     * Subject used for emitting save
     */
    protected saveSubject: Subject<void> = new Subject<void>();

    //######################### public properties #########################

    /**
     * Occurs on undo shortcut
     */
    public get undo(): Observable<void>
    {
        return this.undoSubject.asObservable();
    }

    /**
     * Occurs on redo shortcut
     */
    public get redo(): Observable<void>
    {
        return this.redoSubject.asObservable();
    }

    /**
     * Occurs on new shortcut
     */
    public get new(): Observable<void>
    {
        return this.newSubject.asObservable();
    }

    /**
     * Occurs on save shortcut
     */
    public get save(): Observable<void>
    {
        return this.saveSubject.asObservable();
    }

    //######################### constructor #########################
    constructor(protected hotkeys: AppHotkeysService,)
    {
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public destroy(): void
    {
        this.hotkeys.destroy();
    }

    //######################### public methods #########################

    /**
     * Initialize hotkeys
     */
    public init(): void
    {
        this.hotkeys.hotkeys.add(new Hotkey('ctrl+s', () =>
        {
            this.saveSubject.next();

            return false;
        }, ['INPUT', 'TEXTAREA'], 'Emits save event'));

        this.hotkeys.hotkeys.add(new Hotkey('ctrl+z', () =>
        {
            this.undoSubject.next();

            return false;
        }, ['INPUT', 'TEXTAREA'], 'Emits undo event'));

        this.hotkeys.hotkeys.add(new Hotkey('ctrl+y', () =>
        {
            this.redoSubject.next();

            return false;
        }, ['INPUT', 'TEXTAREA'], 'Emits redo event'));

        this.hotkeys.hotkeys.add(new Hotkey('ctrl+n', () =>
        {
            this.newSubject.next();

            return false;
        }, ['INPUT', 'TEXTAREA'], 'Emits new event'));
    }
}