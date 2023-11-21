import {Injectable} from '@angular/core';

/**
 * Gets overriden defaults for component
 */
@Injectable()
export abstract class DefaultsOverride<TOptions = any>
{
    /**
     * Gets default options for specific component
     * @param packageName 
     * @param name 
     * @param defaultOptions 
     */
    public abstract getOptions(packageName: string, name: string, defaultOptions: TOptions): TOptions;

    /**
     * Gets display name for specific component
     * @param packageName 
     * @param name 
     */
    public abstract getDisplayName(packageName: string, name: string, displayName?: string): string;
}