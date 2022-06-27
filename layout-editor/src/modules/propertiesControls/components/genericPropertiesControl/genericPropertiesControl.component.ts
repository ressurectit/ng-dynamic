import {ChangeDetectionStrategy, Component, Input, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormPipesModule} from '@anglr/common/forms';
import {Dictionary} from '@jscrpt/common';

import {PropertiesControl} from '../../../../interfaces';
import {PropertiesControlBase} from '../propertiesControlBase';
import {PropertyTypeControlsModule} from '../../../propertyTypeControls';
import {LayoutEditorPropertyMetadata} from '../../../../misc/types';

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
    //######################### protected properties - template bindings #########################

    /**
     * Obtained properties metadata
     */
    protected _propertiesMetadata: Dictionary<LayoutEditorPropertyMetadata>|undefined;

    //######################### public properties - inputs #########################

    /**
     * Array of properties that should be displayed by this component
     */
    @Input()
    public properties: string[] = [];

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override async _initialize(): Promise<void>
    {
        if(!this.itemSource)
        {
            return;
        }

        const type = await this._extractor.extractMetadata(this.itemSource);

        if(!type)
        {
            return;
        }

        const properties = await this._propertyExtractor.extract(type.metaInfo?.optionsMetadata?.modelType);

        if(!properties)
        {
            return;
        }

        this._propertiesMetadata = properties;

        this._changeDetector.detectChanges();
    }
}

/**
 * Gets generic properties control component for specific properties
 * @param properties - Array of properties which will be displayed in generic properties control
 */
export function genericPropertiesControlFor(properties: string[]): Type<PropertiesControl>
{
    @Component(
    {
        selector: 'generic-properties-control',
        templateUrl: 'genericPropertiesControl.component.html',
        standalone: true,
        imports:
        [
            CommonModule,
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