import {Pipe, PipeTransform} from '@angular/core';
import {Dictionary} from '@jscrpt/common';

/**
 * Gets indication whether is property selected
 */
@Pipe({name: 'propertySelected'})
export class PropertySelectedSAPipe implements PipeTransform
{
    /**
     * Gets indication whether is property selected
     * @param value - Stores selected properties in their models and components
     * @param component - Name of component
     * @param model - Name of model
     * @param property - Name of property
     */
    public transform(value: Dictionary<Dictionary<string[]>>, component: string, model: string, property: string): boolean
    {
        if(!value[component]?.[model])
        {
            return false;
        }

        return value[component][model].indexOf(property) >= 0;
    }
}