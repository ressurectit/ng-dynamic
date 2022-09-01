import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';

import {ComponentInputsRelationsOptions} from '../componentInputs/componentInputs.options';
import {ComponentOutputsRelationsOptions} from '../componentOutputs/componentOutputs.options';

//TODO: check if this is duplicit in output js bundle

/**
 * Gets component inputs relations metadata or undefined if not exists
 * @param relations - All available relations metadata
 */
export function getInputs(relations: RelationsNodeMetadata[]): RelationsNodeMetadata<ComponentInputsRelationsOptions>|undefined
{
    return relations.find(itm => itm.package == 'custom-components' && itm.name == 'componentInputs');
}

/**
 * Gets component outputs relations metadata or undefined if not exists
 * @param relations - All available relations metadata
 */
export function getOutputs(relations: RelationsNodeMetadata[]): RelationsNodeMetadata<ComponentOutputsRelationsOptions>|undefined
{
    return relations.find(itm => itm.package == 'custom-components' && itm.name == 'componentOutputs');
}
