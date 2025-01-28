import {Pipe, PipeTransform} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {PlaceholderHandler} from '../../../../../services';

/**
 * Gets container metadata that are displayed in placeholder
 */
@Pipe({name: 'containerMetadata'})
export class ContainerMetadataPipe<TOptions = unknown> implements PipeTransform
{
    //######################### constructor #########################
    constructor(protected placeholderHandler: PlaceholderHandler<TOptions>,)
    {
    }

    //######################### public methods - implementation of ContainerMetadataPipe #########################

    /**
     * Gets container metadata that are displayed in placeholder
     * @param value - Id of container
     */
    public transform(value: string): LayoutComponentMetadata<TOptions>|undefined|null
    {
        return this.placeholderHandler.getOptions(value);
    }
}