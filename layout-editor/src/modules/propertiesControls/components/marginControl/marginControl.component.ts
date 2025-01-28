import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {AsFormGroup, FormModelGroup, FormPipesModule} from '@anglr/common/forms';
import {ComponentStylingOptions, Margin} from '@anglr/dynamic/layout';

import {PropertiesControl} from '../../../../interfaces';
import {PropertiesControlBase} from '../propertiesControlBase';
import {InputSizeComponent} from '../../../propertyTypeControls';

/**
 * Component used for displaying editation of margin
 */
@Component(
{
    selector: 'margin-control',
    templateUrl: 'marginControl.component.html',
    imports:
    [
        FormPipesModule,
        InputSizeComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarginControlComponent extends PropertiesControlBase<ComponentStylingOptions> implements PropertiesControl<ComponentStylingOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Margin form group
     */
    protected get _margin(): FormGroup<FormModelGroup<Margin>>|undefined|null
    {
        return this.form?.controls.margin as AsFormGroup<Margin>;
    }
}
