import {Pipe, PipeTransform} from '@angular/core';
import {LocalizePipe} from '@anglr/common';
import {isArray} from '@jscrpt/common';

import {ComponentsPaletteItem} from '../componentsPalette.interface';

//TODO: requires rework

/**
 * Pipe used for filtering component items by filter value
 */
@Pipe(
{
    name: 'componentItemFilter',
})
export class ComponentItemFilterPipe implements PipeTransform
{
    //######################### protected fields #########################

    /**
     * Localize pipe used for localizing string
     */
    protected localizePipe: LocalizePipe;

    //######################### constructor #########################
    constructor()
    {
        this.localizePipe = new LocalizePipe();
    }

    //######################### public methods - PipeTransform #########################

    /**
     * Filters list of node groups with search value
     * @param value - Value to be filtered
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    public transform(value: (ComponentsPaletteItem & {temp?: boolean})[], filter: string|undefined|null): (ComponentsPaletteItem & {temp?: boolean})[]
    {
        if (!isArray(value) || !filter)
        {
            return value;
        }

        return value.filter(component =>
        {
            return this.localizePipe.transform(component.metadata.metaInfo?.name ?? component.itemSource.name)?.toLowerCase().indexOf(filter?.toLowerCase()) >= 0;
        });
    }
}
