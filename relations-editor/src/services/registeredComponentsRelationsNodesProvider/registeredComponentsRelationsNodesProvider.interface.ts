import {Type} from '@angular/core';
import {DynamicModule} from '@anglr/dynamic';

/**
 * Dynamic module for registered components
 */
export interface RegisteredComponentModule extends DynamicModule
{
    /**
     * Type of registered component
     */
    ɵRegisteredComponent: Type<any>;
}
