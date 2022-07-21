import {Injectable} from '@angular/core';
import {RelationOutputMetadata} from '@anglr/dynamic/relations';
import {Dictionary} from '@jscrpt/common';

import {RelationsInput, RelationsNode, RelationsNodeMetadata} from '../../interfaces';
import {WaitingInputRelation} from './relationsNodeManager.interface';

//TODO: logging

/**
 * Class used for handling layout metadata
 */
@Injectable()
export class RelationsNodeManager
{
    //######################### protected properties #########################

    /**
     * Active relation point input
     */
    protected _activeInput: RelationsInput|null|undefined;

    /**
     * Registered relations nodes
     */
    protected _nodes: Dictionary<RelationsNode> = {};

    /**
     * Waiting input relations to be processed when node is created
     */
    protected _waitingInputRelations: Dictionary<WaitingInputRelation[]> = {};

    //######################### public methods #########################

    /**
     * Sets active relation input
     * @param input - Component that represents input
     */
    public setActiveInput(input: RelationsInput|null|undefined): void
    {
        this._activeInput = input;
    }

    /**
     * Gets active relation input
     */
    public getActiveInput(): RelationsInput|null|undefined
    {
        return this._activeInput;
    }

    /**
     * Registers node into manager
     * @param node - Node to be registered
     */
    public registerNode(node: RelationsNode): void
    {
        this._nodes[node.id] = node;

        //iterate over all outputs
        if(node.metadata?.outputs && Array.isArray(node.metadata?.outputs))
        {
            for(const output of node.metadata?.outputs)
            {
                //no inputs
                if(!output.inputs || !Array.isArray(output.inputs))
                {
                    continue;
                }

                const outputNode = node.outputs[output.outputName];

                //no output node
                if(!outputNode)
                {
                    continue;
                }

                for(const input of output.inputs)
                {
                    const relationsNode = this._nodes[input.id];
                    const relation = outputNode.startRelation();

                    //input node does not exists yet
                    if(!relationsNode)
                    {
                        this._waitingInputRelations[input.id] ??= [];
                        this._waitingInputRelations[input.id].push(
                        {
                            inputName: input.inputName,
                            relation: relation,
                        });

                        continue;
                    }

                    const inputNode = relationsNode.inputs[input.inputName];

                    if(!inputNode)
                    {
                        continue;
                    }

                    inputNode.endRelation(relation);
                }
            }
        }
        
        //finalize waiting inputs
        if(this._waitingInputRelations[node.id])
        {
            const waitingInputRelations = this._waitingInputRelations[node.id];
            const inputNode = this._nodes[node.id];

            if(!inputNode)
            {
                return;
            }

            for(const waiting of waitingInputRelations)
            {
                const input = inputNode.inputs[waiting.inputName];

                if(!input)
                {
                    continue;
                }

                input.endRelation(waiting.relation);
                delete this._waitingInputRelations[node.id];
            }
        }
    }

    /**
     * Unregisters node from manager
     * @param node - Node to be unregistered
     */
    public unregisterNode(node: RelationsNode): void
    {
        delete this._nodes[node.id];
    }

    /**
     * Gets current metadata
     */
    public getMetadata(): RelationsNodeMetadata[]
    {
        const result: RelationsNodeMetadata[] = [];
        const nodeIds = Object.keys(this._nodes);
        
        for(const id of nodeIds)
        {
            const node = this._nodes[id];

            if(!node.metadata)
            {
                continue;
            }

            //TODO: coordinates and nodeMetadata.options

            const nodeMeta: RelationsNodeMetadata =
            {
                id,
                name: node.metadata.name,
                package: node.metadata.package,
                displayName: node.metadata.displayName,
                relationsOptions: node.metadata.relationsOptions,
                nodeMetadata: node.metadata.nodeMetadata,
                outputs: []
            };


            if(!node.allOutputs)
            {
                continue;
            }

            for(const output of node.allOutputs)
            {
                if(!output.relations)
                {
                    continue;
                }

                if(!output.name)
                {
                    continue;
                }

                const outputMeta: RelationOutputMetadata =
                {
                    outputName: output.name,
                    inputs: []
                };

                for(const relation of output.relations)
                {
                    if(!relation.input?.name)
                    {
                        continue;
                    }

                    outputMeta.inputs.push(
                    {
                        id: relation.input.parentId,
                        inputName: relation.input.name
                    });
                }

                nodeMeta.outputs?.push(outputMeta);
            }

            result.push(nodeMeta);
        }

        return result;
    }
}