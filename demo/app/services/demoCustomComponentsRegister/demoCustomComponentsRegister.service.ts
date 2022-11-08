import {Inject, Injectable} from '@angular/core';
import {CustomComponentConfiguration, CustomComponentsRegister} from '@anglr/dynamic/layout-relations';
import {PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';
import {Observable, Subject} from 'rxjs';

const CUSTOM_COMPONENTS = 'CUSTOM_COMPONENTS';

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

    /**
     * Sets configuration for custom component
     * @param name - Name of template for which custom config will be set
     * @param config - Config to be set
     */
    public setConfiguration(name: string, config: TConfig): void
    {

    }

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override getRegisteredComponents(): string[]
    {
        return this._store.get<string[]|null>(CUSTOM_COMPONENTS) ?? [];
        // return Object.keys(this._store.get<Dictionary<TConfig>|null>(CUSTOM_COMPONENTS) ?? {});
    }

    /**
     * @inheritdoc
     */
    public override getConfigurationForComponent(_name: string): TConfig|undefined|null
    {
        return null;
    }
}