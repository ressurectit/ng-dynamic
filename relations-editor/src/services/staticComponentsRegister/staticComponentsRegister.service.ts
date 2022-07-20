import {Injectable, Type} from '@angular/core';
import {Dictionary} from '@jscrpt/common';

/**
 * Register for statically typed components that are part of relations
 */
@Injectable()
export abstract class StaticComponentsRegister
{
    //######################### protected fields #########################

    /**
     * Object storing defined types
     */
    protected _definedTypes: Dictionary<Type<any>> = this.getDefinedTypes();

    //######################### public properties #########################

    /**
     * Gets available types that are used as static components
     */
    public get types(): string[]
    {
        return Object.keys(this._definedTypes);
    }

    //######################### public methods #########################

    /**
     * Gets type by its name
     * @param name - Name of type that should be obtained
     */
    public getType(name: string): Type<any>|null
    {
        return this._definedTypes[name] ?? null;
    }

    //######################### protected methods #########################

    /**
     * Gets defined static components types containing metadata
     */
    protected abstract getDefinedTypes(): Dictionary<Type<any>>;
}