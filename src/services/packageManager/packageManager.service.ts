import {DestroyRef, Signal, WritableSignal, inject, signal} from '@angular/core';
import {PermanentStorage, PERMANENT_STORAGE, Logger, LOGGER} from '@anglr/common';
import {PromiseOr} from '@jscrpt/common';
import {Subscription} from 'rxjs';
import {isEqual} from 'lodash-es';

import {PackageSource} from '../../interfaces';
import {PACKAGE_SOURCES} from '../../misc/tokens';

/**
 * Service used for obtaining available and used packages
 */
export class PackageManager
{
    //######################### protected properties #########################
    
    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Signal storing used packages
     */
    protected usedPackagesValue: WritableSignal<readonly string[]> = signal([]);

    /**
     * Signal storing all packages
     */
    protected packagesValue: WritableSignal<readonly string[]> = signal([]);

    /**
     * Permanent storage storing selected packages
     */
    protected store: PermanentStorage = inject(PERMANENT_STORAGE);

    /**
     * Array of package source
     */
    protected packageSources: PackageSource[] = inject(PACKAGE_SOURCES);

    /**
     * Instance of destroy ref
     */
    protected destroyRef: DestroyRef = inject(DestroyRef);

    /**
     * Instance of logger
     */
    protected logger: Logger = inject(LOGGER);

    //######################### public properties #########################

    /**
     * Gets available packages
     */
    public get packages(): Signal<readonly string[]>
    {
        return this.packagesValue.asReadonly();
    }

    /**
     * Gets current usedPackages value
     */
    public get usedPackages(): Signal<readonly string[]>
    {
        return this.usedPackagesValue.asReadonly();
    }
    
    //######################### constructor #########################
    constructor(protected storageName?: string,)
    {
        if(storageName)
        {
            this.usedPackagesValue.set(this.store.get<string[]|null>(storageName) ?? []);
        }
        else
        {
            this.logger.warn('PackageManager: missing storage name, package selection will not be persistent!');
        }

        for(const source of this.packageSources)
        {
            this.initSubscriptions.add(source.packagesChange.subscribe(() => this.setPackages()));
        }

        this.setPackages();
        this.destroyRef.onDestroy(() => this.destroy());
    }
    
    //######################### public methods #########################
    
    /**
     * Sets usedPackages new value
     * @param usedPackages - Value of usedPackages that changed
     */
    public setUsedPackages(usedPackages: string[]): void
    {
        if(isEqual(this.usedPackagesValue(), usedPackages))
        {
            return;
        }
    
        this.usedPackagesValue.set(usedPackages);

        if(this.storageName)
        {
            this.store.set(this.storageName, usedPackages);
        }
    }

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

    //######################### protected methods #########################

    /**
     * Sets packages new value
     */
    protected setPackages(): void
    {
        const packages: string[] = [];

        for(const source of this.packageSources)
        {
            packages.push(...source.packages);
        }

        this.packagesValue.set(packages);
    }
} 