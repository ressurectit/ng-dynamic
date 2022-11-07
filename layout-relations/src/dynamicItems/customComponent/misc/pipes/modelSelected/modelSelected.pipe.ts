import {Pipe, PipeTransform} from '@angular/core';
import {LayoutPropertiesModelType} from '@anglr/dynamic/layout-editor';

/**
 * Gets indication whether is model selected
 */
@Pipe({name: 'modelSelected', standalone: true})
export class ModelSelectedSAPipe implements PipeTransform
{
    /**
     * Gets indication whether is model selected
     * @param value - transformValueComment
     * @param used - Array of used layout properties
     */
    public transform(value: LayoutPropertiesModelType, used: string[]|undefined|null): boolean
    {
        if(!used)
        {
            return false;
        }

        return used.indexOf(value.name) >= 0;
    }
}