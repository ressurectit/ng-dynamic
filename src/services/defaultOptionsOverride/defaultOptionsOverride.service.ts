import {Injectable} from '@angular/core';

/**
 * Gets overriden default options for component
 */
@Injectable()
export abstract class DefaultOptionsOverride<TOptions = any>
{
    public abstract get(packageName: string, name: string, defaultOptions: TOptions): TOptions;
}