import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {NgClass} from '@angular/common';
import {PropertiesControl, PropertiesControlBase} from '@anglr/dynamic/layout-editor';

import {ButtonPreset} from '../../../interfaces';
import {BUTTONS_PRESETS} from '../../tokens';

const defaultPresets: ButtonPreset[] = 
[
    {
        text: 'primary',
        cssClass: 'btn btn-primary'
    },
    {
        text: 'info',
        cssClass: 'btn btn-info'
    },
    {
        text: 'default',
        cssClass: 'btn btn-default'
    },
    {
        text: 'success',
        cssClass: 'btn btn-success'
    },
    {
        text: 'warning',
        cssClass: 'btn btn-warning'
    },
    {
        text: 'danger',
        cssClass: 'btn btn-danger'
    },
    {
        text: 'error',
        cssClass: 'btn btn-error'
    }
];

/**
 * Component used for displaying button presets
 */
@Component(
{
    selector: 'button-presets',
    templateUrl: 'buttonPresetsPropertiesControl.component.html',
    standalone: true,
    imports:
    [
        NgClass,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonPresetsPropertiesControlSAComponent extends PropertiesControlBase implements PropertiesControl
{
    //######################### private properties #########################

    /**
     * Injected buttons presets
     */
    protected buttonsPresets?: ButtonPreset[] = inject(BUTTONS_PRESETS, {optional: true}) ?? defaultPresets;

    //######################### protected methods #########################

    /**
     * Sets button preset
     * @param cssClass 
     */
    protected _setPreset(cssClass: string)
    {
        this.form?.get('buttonCssClass')?.setValue(cssClass);
    }
}