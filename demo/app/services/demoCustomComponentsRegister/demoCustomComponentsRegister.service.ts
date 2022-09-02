import {Inject, Injectable} from '@angular/core';
import {CustomComponentsRegister} from '@anglr/dynamic/layout-relations';
import {PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';
import {Observable, Subject} from 'rxjs';

const CUSTOM_COMPONENTS = 'CUSTOM_COMPONENTS';

/**
 * Demo custom components register
 */
@Injectable()
export class DemoCustomComponentsRegister extends CustomComponentsRegister
{
    //######################### private fields #########################
    
    /**
     * Used for emitting registered changes
     */
    private _registeredChange: Subject<void> = new Subject<void>();
    
    //######################### public properties #########################
    
    /**
     * Occurs when registered changes
     */
    public get registeredChange(): Observable<void>
    {
        return this._registeredChange.asObservable();
    }
    
    //######################### constructor #########################
    constructor(@Inject(PERMANENT_STORAGE) private _store: PermanentStorage)
    {
        super();
    }

    //######################### public methods #########################

    /**
     * Toggles template as registered custom component
     * @param name - Name of template to be toggled
     */
    public toggleRegisteredComponent(name: string): void
    {
        const customComponents = this.getRegisteredComponents();
        const index = customComponents.indexOf(name);


        if(index >= 0)
        {
            customComponents.splice(index, 1);
        }
        else
        {
            customComponents.push(name);
        }

        this._store.set(CUSTOM_COMPONENTS, customComponents);
        this._registeredChange.next();
    }

    //######################### public methods - overrides #########################

    /**
     * Gets registered components
     */
    public override getRegisteredComponents(): string[]
    {
        return this._store.get<string[]|null>(CUSTOM_COMPONENTS) ?? [];
    }
}