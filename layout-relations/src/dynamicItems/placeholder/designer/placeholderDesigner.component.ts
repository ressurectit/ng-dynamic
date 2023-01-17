import {Component, ChangeDetectionStrategy, FactoryProvider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PlaceholderSAComponent} from '../placeholder.component';
import {PlaceholderComponentOptions} from '../placeholder.options';
import {PlaceholderHandler} from '../../../services';
import {ComponentWithId} from '../../../interfaces';

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
        // <FactoryProvider>
        // {
        //     provide: LAYOUT_COMPONENT_TRANSFORM,
        //     useFactory: () =>
        //     {
        //         const customComponentOwner = inject(CustomComponentSAComponent, {optional: true});
        //         const isDesignTime = !!customComponentOwner?.customComponentInjector.get(LAYOUT_COMPONENT_TRANSFORM, null, {optional: true, skipSelf: true});

        //         return isDesignTime ? layoutDesignerComponentTransform : null;
        //     }
        // },
        // <FactoryProvider>
        // {
        //     provide: CustomComponentSAComponent,
        //     useFactory: () =>
        //     {
        //         let customComponentOwner = inject(CustomComponentSAComponent, {optional: true, skipSelf: true});

        //         while(customComponentOwner)
        //         {
        //             const isDesignTime = !!customComponentOwner.customComponentInjector.get(LAYOUT_COMPONENT_TRANSFORM, null, {optional: true, skipSelf: true});

        //             if(isDesignTime)
        //             {
        //                 return customComponentOwner;
        //             }

        //             customComponentOwner = customComponentOwner.customComponentInjector.get(CustomComponentSAComponent, null, {optional: true, skipSelf: true});
        //         }

        //         return null;
        //     },
        // },
        <FactoryProvider>
        {
            provide: PlaceholderHandler,
            useFactory: () =>
            {
                return new PlaceholderHandler(PlaceholderDesignerSAComponent);
            }
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderDesignerSAComponent extends PlaceholderSAComponent implements LayoutComponent<PlaceholderComponentOptions>, ComponentWithId
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override afterInit(): void
    {
        // if(!this.showPlaceholder)
        // {
        //     const customComponentOptions = this.parentCustomComponent?.options;

        //     if(!customComponentOptions)
        //     {
        //         return;
        //     }

        //     //placeholder container metadata does not exists yet
        //     if(!customComponentOptions.placeholderContainers?.[this.id])
        //     {
        //         const containerId = `placeholderContainer-${this.parentCustomComponent?.id}-${this.id}`;

        //         customComponentOptions.placeholderContainers ??= {};
        //         customComponentOptions.placeholderContainers[this.id] =
        //         {
        //             id: containerId,
        //             name: 'placeholderContainer',
        //             package: 'custom-components',
        //             displayName: containerId,
        //             options: {},
        //         };
        //     }
        // }
    }
}