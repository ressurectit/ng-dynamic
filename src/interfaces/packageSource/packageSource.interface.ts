import {PromiseOr} from '@jscrpt/common';
import {Observable} from 'rxjs';

export interface PackageSource
{
    //######################### properties #########################

    /**
     * Occurs when available packages changes
     */
    readonly packagesChange: Observable<void>;

    /**
     * Gets available packages from source
     */
    readonly packages: readonly string[];

    //######################### methods #########################

    /**
     * Refresh available packages from source
     */
    refresh(): PromiseOr<void>;
}