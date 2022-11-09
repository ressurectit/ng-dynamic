import {Inject, Injectable} from '@angular/core';
import {CustomComponentConfiguration, CustomComponentsRegister} from '@anglr/dynamic/layout-relations';
import {PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';
import {Dictionary} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

const CUSTOM_COMPONENTS = 'DEMO_CUSTOM_COMPONENTS';

/**
 * Demo custom components register
 */
@Injectable()
export class DemoCustomComponentsRegister<TConfig extends CustomComponentConfiguration = CustomComponentConfiguration> extends CustomComponentsRegister<TConfig>
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
        const customComponents = this._store.get<Dictionary<TConfig>|null>(CUSTOM_COMPONENTS) ?? {};

        if(customComponents[name])
        {
            delete customComponents[name];
        }
        else
        {
            customComponents[name] = {} as TConfig;
        }

        this._store.set(CUSTOM_COMPONENTS, customComponents);
        this._registeredChange.next();
    }

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override getRegisteredComponents(): string[]
    {
        return Object.keys(this._store.get<Dictionary<TConfig>|null>(CUSTOM_COMPONENTS) ?? {});
    }

    /**
     * @inheritdoc
     */
    public override getConfigurationForComponent(name: string): TConfig|undefined|null
    {
        const customComponents = this._store.get<Dictionary<TConfig>|null>(CUSTOM_COMPONENTS) ?? {};

        if(!customComponents[name])
        {
            return null;
        }

        return customComponents[name];
    }

    /**
     * @inheritdoc
     */
    public override setConfigurationForComponent(name: string, config: TConfig): void
    {
        const customComponents = this._store.get<Dictionary<TConfig>|null>(CUSTOM_COMPONENTS) ?? {};

        if(!customComponents[name])
        {
            return;
        }

        customComponents[name] = config;
        
        this._store.set(CUSTOM_COMPONENTS, customComponents);
        this._registeredChange.next();
    }
}