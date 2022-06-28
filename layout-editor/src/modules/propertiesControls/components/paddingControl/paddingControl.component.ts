import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AsFormGroup, FormModelGroup} from '@anglr/common/forms';
import {ComponentStylingOptions, Padding} from '@anglr/dynamic/layout';

import {PropertiesControl} from '../../../../interfaces';
import {PropertiesControlBase} from '../propertiesControlBase';

/**
 * Component used for displaying editation of padding
 */
@Component(
{
    selector: 'padding-control',
    templateUrl: 'paddingControl.component.html',
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
