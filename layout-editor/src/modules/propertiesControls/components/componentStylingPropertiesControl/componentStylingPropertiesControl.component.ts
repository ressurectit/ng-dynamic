import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ComponentStylingOptions} from '@anglr/dynamic/layout';

import {PropertiesControl} from '../../../../interfaces';
import {PropertiesControlBase} from '../propertiesControlBase';

/**
 * Component used for displaying editation of component styling
 */
@Component(
{
    selector: 'component-styling',
    templateUrl: 'componentStylingPropertiesControl.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentStylingPropertiesControlComponent extends PropertiesControlBase<ComponentStylingOptions> implements PropertiesControl<ComponentStylingOptions>
{
}
