import {inject} from '@angular/core';
import {PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';
import {PromiseOr} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

/**
 * Service used for obtaining available and used packages
 */
export abstract class PackageManager
{
    //######################### private fields #########################
    
    /**
     * Current usedPackages value
     */
    private _usedPackages: string[] = [];

    //######################### protected properties #########################
    
    /**
     * Used for emitting usedPackages changes
     */
    protected usedPackagesSubject: Subject<void> = new Subject<void>();

    /**
     * Permanent storage storing selected packages
     */
    protected store: PermanentStorage = inject(PERMANENT_STORAGE);

    //######################### public properties #########################

    /**
     * Occurs when available packages changes
     */
    public abstract get packagesChange(): Observable<void>;

    /**
     * Gets available packages
     */
    public abstract get packages(): readonly string[];

    /**
     * Gets current usedPackages value
     */
    public get usedPackages(): string[]
    {
        return this._usedPackages;
    }
    protected set usedPackages(value: string[])
    {
        this._usedPackages = value;
    }
    
    /**
     * Occurs when usedPackages changes
     */
    public get usedPackagesChange(): Observable<void>
    {
        return this.usedPackagesSubject.asObservable();
    }

    //######################### constructor #########################
    constructor(protected storageName: string,)
    {
        this.usedPackages = this.store.get<string[]|null>(storageName) ?? [];
    }
    
    //######################### public methods #########################
    
    /**
     * Sets usedPackages new value
     * @param usedPackages - Value of usedPackages that changed
     */
    public setUsedPackages(usedPackages: string[]): void
    {
        if(this._usedPackages == usedPackages)
        {
            return;
        }
    
        this._usedPackages = usedPackages;
        this.store.set(this.storageName, usedPackages);
        this.usedPackagesSubject.next();
    }

    //######################### public methods #########################

    /**
     * Refresh available packages with current data
     */
    public abstract refresh(): PromiseOr<void>;
}