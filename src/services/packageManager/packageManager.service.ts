import {inject} from '@angular/core';
import {PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';
import {PromiseOr} from '@jscrpt/common';
import {Observable, Subject, Subscription} from 'rxjs';

import {PackageSource} from '../../interfaces';
import {PACKAGE_SOURCES} from '../../misc/tokens';

/**
 * Service used for obtaining available and used packages
 */
export class PackageManager
{
    //######################### private fields #########################
    
    /**
     * Current usedPackages value
     */
    private _usedPackages: string[] = [];

    //######################### protected properties #########################
    
    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Used for emitting usedPackages changes
     */
    protected usedPackagesSubject: Subject<void> = new Subject<void>();

    /**
     * Used for emitting packages changes
     */
    protected packagesChangeSubject: Subject<void> = new Subject<void>();

    /**
     * Permanent storage storing selected packages
     */
    protected store: PermanentStorage = inject(PERMANENT_STORAGE);

    /**
     * Array of package source
     */
    protected packageSources: PackageSource[] = inject(PACKAGE_SOURCES);

    //######################### public properties #########################

    /**
     * Occurs when available packages changes
     */
    public get packagesChange(): Observable<void>
    {
        return this.packagesChangeSubject.asObservable();
    }

    /**
     * Gets available packages
     */
    public get packages(): readonly string[]
    {
        const result: string[] = [];

        for(const source of this.packageSources)
        {
            result.push(...source.packages);
        }

        return result;
    }

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

        for(const source of this.packageSources)
        {
            this.initSubscriptions.add(source.packagesChange.subscribe(() =>this.packagesChangeSubject.next()));
        }
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
    public refresh(): PromiseOr<void>
    {
        for(const source of this.packageSources)
        {
            source.refresh();
        }
    }

    /**
     * Destroys service and all its resources
     */
    public destroy(): void
    {
        this.initSubscriptions.unsubscribe();
    }
} 