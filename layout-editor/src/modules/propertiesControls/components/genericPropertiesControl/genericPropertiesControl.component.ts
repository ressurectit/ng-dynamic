import {Component, Input} from '@angular/core';
import {FirstUppercaseLocalizePipe, TooltipDirective} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';

import {PropertiesControl} from '../../../../interfaces';
import {PropertiesControlBase} from '../propertiesControlBase';
import {PropertyTypeControlRendererDirective} from '../../../propertyTypeControls';
import {PropertiesControlGetter} from '../../../../decorators/layoutEditorMetadata/layoutEditorMetadata.interface';

/**
 * Component used for displaying default generic properties control, displaying specified properties
 */
@Component(
{
    selector: 'default-generic-properties-control',
    templateUrl: 'genericPropertiesControl.component.html',
    imports:
    [
        FormPipesModule,
        TooltipDirective,
        FirstUppercaseLocalizePipe,
        PropertyTypeControlRendererDirective,
    ],
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
export function genericPropertiesControlFor<TModel>(properties: (Extract<keyof TModel, string>)[]): PropertiesControlGetter
{
    const propertiesControlGetter = () => DefaultGenericPropertiesControlComponent;

    propertiesControlGetter.inputs = {properties};

    return propertiesControlGetter;
}
