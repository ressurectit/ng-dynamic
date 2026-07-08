import {Pipe, PipeTransform} from '@angular/core';
import {KeyValue} from '@angular/common';
import {LocalizePipe} from '@anglr/common';
import {isArray} from '@jscrpt/common';

import {ComponentsPaletteItem} from '../componentsPalette.interface';

//TODO: requires rework

/**
 * Pipe used for filtering component groups by filter value
 */
@Pipe(
{
    name: 'componentGroupFilter',
})
export class ComponentGroupFilterPipe implements PipeTransform
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
    public transform(value: Array<KeyValue<string, (ComponentsPaletteItem & {temp?: boolean})[]>>, filter: string|undefined|null): Array<KeyValue<string, (ComponentsPaletteItem & {temp?: boolean})[]>>
    {
        if(!isArray(value) || !filter)
        {
            return value;
        }

        return value.filter(datum =>
        {
            return isArray(datum.value) && datum.value.filter(component => this.localizePipe.transform(component.metadata.metaInfo?.name ?? component.itemSource.name)?.toLowerCase().indexOf(filter?.toLowerCase()) >= 0).length > 0;
        });
    }
}
