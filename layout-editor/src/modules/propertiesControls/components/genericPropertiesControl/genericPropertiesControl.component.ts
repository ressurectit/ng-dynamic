import {ChangeDetectionStrategy, Component, Input, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipModule} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';

import {PropertiesControl} from '../../../../interfaces';
import {PropertiesControlBase} from '../propertiesControlBase';
import {PropertyTypeControlsModule} from '../../../propertyTypeControls';

/**
 * Component used for displaying default generic properties control, displaying specified properties
 */
@Component(
{
    selector: 'default-generic-properties-control',
    templateUrl: 'genericPropertiesControl.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultGenericPropertiesControlComponent<TOptions = any> extends PropertiesControlBase<TOptions> implements PropertiesControl<TOptions>
{
    //######################### public properties - inputs #########################

    /**
     * Array of properties that should be displayed by this component
     */
    @Input()
    public properties: string[] = [];
}

/**
 * Gets generic properties control component for specific properties
 * @param properties - Array of properties which will be displayed in generic properties control
 */
export function genericPropertiesControlFor<TModel>(properties: (Extract<keyof TModel, string>)[]): Type<PropertiesControl>
{
    @Component(
    {
        selector: 'generic-properties-control',
        templateUrl: 'genericPropertiesControl.component.html',
        standalone: true,
        imports:
        [
            CommonModule,
            TooltipModule,
            PropertyTypeControlsModule,
            FormPipesModule,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class GenericPropertiesControl<TOptions = any> extends DefaultGenericPropertiesControlComponent implements PropertiesControl<TOptions>
    {
        /**
         * @inheritdoc
         */
        @Input()
        public override properties: string[] = properties;
    }

    return GenericPropertiesControl;
}