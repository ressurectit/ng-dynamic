import {Component, ChangeDetectionStrategy, ValueProvider, ExistingProvider} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective, LAYOUT_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';
import {PromiseOr} from '@jscrpt/common';

import {CustomComponentSAComponent} from '../customComponent.component';
import {CustomComponentComponentOptions} from '../customComponent.options';

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
    ],
    providers:
    [
        <ValueProvider>
        {
            provide: LAYOUT_COMPONENT_TRANSFORM,
            useValue: null
        },
        <ExistingProvider>
        {
            provide: CustomComponentSAComponent,
            useExisting: CustomComponentDesignerSAComponent,
        }
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