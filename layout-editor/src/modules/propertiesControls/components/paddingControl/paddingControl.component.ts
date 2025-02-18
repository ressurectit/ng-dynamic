import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {AsFormGroup, FormModelGroup, FormPipesModule} from '@anglr/common/forms';
import {ComponentStylingOptions, Padding} from '@anglr/dynamic/layout';

import {PropertiesControl} from '../../../../interfaces';
import {PropertiesControlBase} from '../propertiesControlBase';
import {InputSizeComponent} from '../../../propertyTypeControls';

/**
 * Component used for displaying editation of padding
 */
@Component(
{
    selector: 'padding-control',
    templateUrl: 'paddingControl.component.html',
    imports:
    [
        FormPipesModule,
        InputSizeComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaddingControlComponent extends PropertiesControlBase<ComponentStylingOptions> implements PropertiesControl<ComponentStylingOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Padding form group
     */
    protected get _padding(): FormGroup<FormModelGroup<Padding>>|undefined|null
    {
        return this.form?.controls.padding as AsFormGroup<Padding>;
    }
}
