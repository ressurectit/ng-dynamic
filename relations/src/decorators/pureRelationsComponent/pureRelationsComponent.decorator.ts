import {Type} from '@angular/core';

import {RelationsComponent} from '../../interfaces';

/**
 * Defines identification of relations component type
 */
interface ɵRelationsComponentTypeId
{
    /**
     * Indication that this component is relations component
     */
    __ɵɵRelationsComponent: boolean;
}

/**
 * Tests object whether it is RelationsComponent type
 * @param obj - Object to be tested
 */
export function isRelationsComponentType(obj: unknown): obj is Type<RelationsComponent>
{
    const trgt = obj as ɵRelationsComponentTypeId;

    return !!trgt.__ɵɵRelationsComponent;
}

/**
 * Marks component as pure relations component, cant be used on component that is also layout component!
 */
export function PureRelationsComponent(): ClassDecorator
{
    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        const trgt = target as unknown as ɵRelationsComponentTypeId;

        trgt.__ɵɵRelationsComponent = true;

        return target;
    };
}