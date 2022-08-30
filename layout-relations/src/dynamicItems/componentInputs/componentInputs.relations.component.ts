import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {ComponentInputsRelationsMetadataLoader} from './componentInputs.metadata';
import {ComponentInputsRelationsOptions} from './componentInputs.options';

/**
 * Relations used for connecting relations inputs with external relations
 */
@Component(
{
    selector: 'component-inputs',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(ComponentInputsRelationsMetadataLoader)
export class ComponentInputsRelationsSAComponent implements RelationsComponent<ComponentInputsRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: ComponentInputsRelationsOptions|undefined|null;

    //######################### public methods - implementation of RelationsComponent #########################
    
    // /**
    //  * @inheritdoc
    //  */
    // public ngOnChanges(changes: SimpleChanges): void
    // {
    //     if(nameof<NegationRelations>('condition') in changes)
    //     {
    //         this.negatedCondition = !this.condition;
    //     }
    // }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}