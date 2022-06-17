import {Injectable} from '@angular/core';
import {Dictionary} from '@jscrpt/common';

import type {LayoutDesignerSAComponent} from '../../components';

/**
 * Data that are stored for each layout designer component in manager
 */
interface LayoutDesignerComponentData
{
    /**
     * Id of registered component
     */
    id: string;

    /**
     * Component instance that is being registered
     */
    component: LayoutDesignerSAComponent;
}

/**
 * Class used for handling layout metadata
 */
@Injectable()
export class LayoutMetadataManager
{
    //######################### protected fields #########################

    /**
     * Array of root layout designer components
     */
    protected _rootComponents: LayoutDesignerSAComponent[] = [];

    /**
     * Array of all registered layout designer components
     */
    protected _components: Dictionary<LayoutDesignerComponentData> = {};

    //######################### public methods #########################

    /**
     * Registers layout designer component
     * @param component - Component instance that is being registered
     * @param id - Id of registered component
     * @param root - Indication that component is root component
     */
    public registerLayoutDesignerComponent(component: LayoutDesignerSAComponent, id: string, root: boolean = false): void
    {
        //already exists
        if(this._components[id])
        {
            //logg error

            return;
        }
    }

    /**
     * Unregisters layout designer component
     * @param id - Id of component that will be unregistered
     */
    public unregisterLayoutDesignerComponent(id: string): void
    {
        const componentData = this._components[id];

        if(componentData)
        {
            const index = this._rootComponents.findIndex(itm => itm === componentData.component);
            this._rootComponents.splice(index, 1);
        }

        delete this._components[id];
    }
}