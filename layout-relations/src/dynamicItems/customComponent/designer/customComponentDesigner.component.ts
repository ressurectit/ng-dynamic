import {Component, ChangeDetectionStrategy, ExistingProvider, FactoryProvider, inject} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective, LayoutRenderer} from '@anglr/dynamic/layout';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';
import {PromiseOr} from '@jscrpt/common';

import {CustomComponentSAComponent} from '../customComponent.component';
import {CustomComponentComponentOptions} from '../customComponent.options';
import {PlaceholderHandler} from '../../../services';

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
        LayoutRenderer,
        <ExistingProvider>
        {
            provide: CustomComponentSAComponent,
            useExisting: CustomComponentDesignerSAComponent,
        },
        <FactoryProvider>
        {
            provide: PlaceholderHandler,
            useFactory: () =>
            {

                return new PlaceholderHandler(CustomComponentSAComponent, inject(CustomComponentSAComponent));
            }
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