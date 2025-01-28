import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ComponentStylingOptions} from '@anglr/dynamic/layout';
import {CastPipesModule, FirstUppercaseLocalizePipe, TooltipDirective} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';

import {PropertiesControl} from '../../../../interfaces';
import {PropertiesControlBase} from '../propertiesControlBase';
import {InputStringComponent} from '../../../propertyTypeControls';
import {MarginControlComponent} from '../marginControl/marginControl.component';
import {PaddingControlComponent} from '../paddingControl/paddingControl.component';

/**
 * Component used for displaying editation of component styling
 */
@Component(
{
    selector: 'component-styling',
    templateUrl: 'componentStylingPropertiesControl.component.html',
    imports:
    [
        CastPipesModule,
        FormPipesModule,
        TooltipDirective,
        InputStringComponent,
        MarginControlComponent,
        PaddingControlComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentStylingPropertiesControlComponent extends PropertiesControlBase<ComponentStylingOptions> implements PropertiesControl<ComponentStylingOptions>
{
}
