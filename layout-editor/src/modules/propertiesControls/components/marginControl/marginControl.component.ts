import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {PropertiesControl} from '../../../../interfaces';
import {PropertiesControlBase} from '../propertiesControlBase';

/**
 * Component used for displaying editation of margin
 */
@Component(
{
    selector: 'margin-control',
    templateUrl: 'marginControl.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarginControlComponent<TOptions = any> extends PropertiesControlBase<TOptions> implements PropertiesControl<TOptions>
{
    //######################### public properties - inputs #########################

    /**
     * Array of properties that should be displayed by this component
     */
    @Input()
    public properties: string[] = [];
}
