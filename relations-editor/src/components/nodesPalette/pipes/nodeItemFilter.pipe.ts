import {Pipe, PipeTransform} from '@angular/core';
import {LocalizePipe} from '@anglr/common';
import {isArray} from '@jscrpt/common';

import {NodesPaletteItem} from '../nodesPalette.interface';

//TODO: requires rework

/**
 * Pipe used for filtering node items by filter value
 */
@Pipe(
{
    name: 'nodeItemFilter',
})
export class NodeItemFilterPipe implements PipeTransform
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
     * Filters list of node items with search value
     * @param value - Value to be filtered
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    public transform(value: (NodesPaletteItem & {temp?: boolean})[], filter: string|undefined|null): (NodesPaletteItem & {temp?: boolean})[]
    {
        if (!isArray(value) || !filter)
        {
            return value;
        }

        return value.filter(component =>
        {
            return this.localizePipe.transform(component.metadata.singleton ? (component.metadata.displayName || component.itemSource.name) : (component.metadata.metaInfo?.name ?? component.itemSource.name))?.toLowerCase().indexOf(filter?.toLowerCase()) >= 0;
        });
    }
}
