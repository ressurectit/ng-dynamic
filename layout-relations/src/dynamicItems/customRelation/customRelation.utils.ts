import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';

import {ComponentInputsRelationsOptions} from '../componentInputs/componentInputs.options';
import {ComponentOutputsRelationsOptions} from '../componentOutputs/componentOutputs.options';

/**
 * Gets custom relation inputs relations metadata or undefined if not exists
 * @param relations - All available relations metadata
 */
export function getInputs(relations: RelationsNodeMetadata[]): RelationsNodeMetadata<ComponentInputsRelationsOptions>|undefined
{
    return relations.find(itm => itm.package == 'custom-relations' && itm.name == 'relationsInputs');
}

/**
 * Gets custom relation outputs relations metadata or undefined if not exists
 * @param relations - All available relations metadata
 */
export function getOutputs(relations: RelationsNodeMetadata[]): RelationsNodeMetadata<ComponentOutputsRelationsOptions>|undefined
{
    return relations.find(itm => itm.package == 'custom-relations' && itm.name == 'relationsOutputs');
}
