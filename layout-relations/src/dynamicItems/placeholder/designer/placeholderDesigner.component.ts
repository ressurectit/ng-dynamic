import {Component, ChangeDetectionStrategy, FactoryProvider, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentRendererSADirective, LayoutRenderer} from '@anglr/dynamic/layout';
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
        <FactoryProvider>
        {
            provide: LayoutRenderer,
            useFactory: () => inject(PlaceholderHandler).layoutRenderer ?? new LayoutRenderer(),
        },
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
        //only when displaying container
        if(this.placeholderHandler.placeholderContainer && this.placeholderHandler.designMode)
        {
            this.placeholderHandler.initOptions();
        }
    }
}