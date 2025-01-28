import {Component, ChangeDetectionStrategy, ExistingProvider, FactoryProvider, inject} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererDirective, LayoutRenderer} from '@anglr/dynamic/layout';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';
import {PromiseOr} from '@jscrpt/common';

import {CustomComponentComponent} from '../customComponent.component';
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
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    providers:
    [
        LayoutRenderer,
        <ExistingProvider>
        {
            provide: CustomComponentComponent,
            useExisting: CustomComponentDesignerComponent,
        },
        <FactoryProvider>
        {
            provide: PlaceholderHandler,
            useFactory: () =>
            {

                return new PlaceholderHandler(CustomComponentComponent, inject(CustomComponentComponent));
            }
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponentDesignerComponent extends CustomComponentComponent implements LayoutComponent<CustomComponentComponentOptions>, RelationsComponent
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