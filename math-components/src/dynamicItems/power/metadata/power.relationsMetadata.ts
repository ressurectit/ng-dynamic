import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {MathPowerNodeComponent} from '../node/power.component';

/**
 * MathPower relations metadata
 */
export class MathPowerRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Power',
        description: 'Amplify input value by the specified exponent',
        group: 'Math',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = MathPowerNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}