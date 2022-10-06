import {Component, ChangeDetectionStrategy, FactoryProvider, inject, InjectFlags} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentRendererSADirective, LAYOUT_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout';
import {layoutDesignerComponentTransform} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PlaceholderSAComponent} from '../placeholder.component';
import {PlaceholderComponentOptions} from '../placeholder.options';
import {CustomComponentSAComponent} from '../../customComponent/customComponent.component';

/**
 * Component used for displaying placeholder designer
 */
@Component(
{
    selector: 'placeholder-designer',
    templateUrl: 'placeholderDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        CommonModule,
        LayoutComponentRendererSADirective,
    ],
    providers:
    [
        <FactoryProvider>
        {
            provide: LAYOUT_COMPONENT_TRANSFORM,
            useFactory: () =>
            {
                const customComponentOwner = inject(CustomComponentSAComponent, {optional: true});
                const isDesignTime = !!customComponentOwner?.customComponentInjector.get(LAYOUT_COMPONENT_TRANSFORM, null, InjectFlags.Optional|InjectFlags.SkipSelf);

                return isDesignTime ? layoutDesignerComponentTransform : null;
            }
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderDesignerSAComponent extends PlaceholderSAComponent implements LayoutComponent<PlaceholderComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override afterInit(): void
    {
        if(this.inCustomComponent)
        {
            const customComponentOptions = this.parentCustomComponent?.options;

            if(!customComponentOptions)
            {
                return;
            }

            //placeholder container metadata does not exists yet
            if(!customComponentOptions.placeholderContainers?.[this.id])
            {
                const containerId = `placeholderContainer-${this.parentCustomComponent?.id}-${this.id}`;

                customComponentOptions.placeholderContainers ??= {};
                customComponentOptions.placeholderContainers[this.id] =
                {
                    id: containerId,
                    name: 'placeholderContainer',
                    package: 'custom-components',
                    displayName: containerId,
                    options: {},
                };
            }
        }
    }
}