import {Injector} from '@angular/core';

import {RelationsComponent} from '../../interfaces';

/**
 * Defines relations with injector instance
 */
export interface RelationsWithInjector
{
    /**
     * Angular injector for DI
     */
    ɵɵinjector?: Injector;
}

/**
 * Data that are passed when marking for check
 */
export interface MarkForCheckId
{
    /**
     * Id of component which output has changed
     */
    componentId: string|RelationsComponent;

    /**
     * Name of output that has changed
     */
    outputName: string;
}