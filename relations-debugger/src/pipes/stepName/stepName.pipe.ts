import {Pipe, PipeTransform} from '@angular/core';
import {RelationsStepDebugInfo} from '@anglr/dynamic/relations';

/**
 * Transforms step into readable name
 */
@Pipe({name: 'stepName', standalone: true,})
export class StepNameSAPipe implements PipeTransform
{
    /**
     * Transforms step into readable name
     * @param value - Step data
     */
    public transform(value: RelationsStepDebugInfo|undefined|null): string 
    {
        if(!value)
        {
            return '---';
        }
        
        if(value.componentRegistration)
        {
            return 'registration';
        }
        
        if(value.componentUnregistration)
        {
            return 'unregistration';
        }

        if(value.dataTransfer)
        {
            return 'data transfer';
        }

        return 'unkown';
    }
}