import {Inject, Injectable} from '@angular/core';
import {CustomRelationsConfiguration, CustomRelationsRegister} from '@anglr/dynamic/layout-relations';
import {PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';
import {Dictionary} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

const CUSTOM_RELATIONS = 'DEMO_RELATIONS_COMPONENTS';

/**
 * Demo custom relations register
 */
@Injectable()
export class DemoCustomRelationsRegister<TConfig extends CustomRelationsConfiguration = CustomRelationsConfiguration> extends CustomRelationsRegister<TConfig>
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
        const customComponents = this._store.get<Dictionary<TConfig>|null>(CUSTOM_RELATIONS) ?? {};

        if(customComponents[name])
        {
            delete customComponents[name];
        }
        else
        {
            customComponents[name] = {} as TConfig;
        }

        this._store.set(CUSTOM_RELATIONS, customComponents);
        this._registeredChange.next();
    }

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override getRegisteredComponents(): string[]
    {
        return Object.keys(this._store.get<Dictionary<TConfig>|null>(CUSTOM_RELATIONS) ?? {});
    }

    /**
     * @inheritdoc
     */
    public override getConfigurationForComponent(name: string): TConfig|undefined|null
    {
        const customComponents = this._store.get<Dictionary<TConfig>|null>(CUSTOM_RELATIONS) ?? {};

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
        const customComponents = this._store.get<Dictionary<TConfig>|null>(CUSTOM_RELATIONS) ?? {};

        if(!customComponents[name])
        {
            return;
        }

        customComponents[name] = config;
        
        this._store.set(CUSTOM_RELATIONS, customComponents);
        this._registeredChange.next();
    }
}