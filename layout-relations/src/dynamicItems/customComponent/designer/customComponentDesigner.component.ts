import {Component, ChangeDetectionStrategy, ValueProvider} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective, LAYOUT_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';
import {PromiseOr} from '@jscrpt/common';

import {CustomComponentSAComponent} from '../customComponent.component';
import {CustomComponentComponentOptions} from '../customComponent.options';
import {ComponentOutputsRelationsSAComponent} from '../../componentOutputs/componentOutputs.relations.component';
import {ComponentInputsRelationsSAComponent} from '../../componentInputs/componentInputs.relations.component';

/**
 * Component used for displaying custom component designer
 */
@Component(
{
    selector: 'custom-component-designer',
    templateUrl: '../customComponent.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
        ComponentInputsRelationsSAComponent,
        ComponentOutputsRelationsSAComponent,
    ],
    providers:
    [
        <ValueProvider>
        {
            provide: LAYOUT_COMPONENT_TRANSFORM,
            useValue: null
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponentDesignerSAComponent extends CustomComponentSAComponent implements LayoutComponent<CustomComponentComponentOptions>, RelationsComponent
{
    //######################### public - overrides #########################

    /**
     * @inheritdoc
     */
    public override processCustomComponentData(name: string): PromiseOr<void>
    {
        if(this.options)
        {
            this.options.name = name;
        }
    }
}