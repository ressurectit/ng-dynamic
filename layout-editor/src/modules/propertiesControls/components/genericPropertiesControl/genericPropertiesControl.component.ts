import {ChangeDetectionStrategy, Component, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup} from '@angular/forms';
import {FormModelGroup} from '@anglr/common/forms';
import {DynamicItemSource} from '@anglr/dynamic';

import {PropertiesControl} from '../../../../interfaces';

@Component(
{
    selector: 'default-generic-properties-control',
    templateUrl: 'genericPropertiesControl.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultGenericPropertiesControlComponent<TOptions = any> implements PropertiesControl<TOptions>
{

    /**
     * Form group representing whole options
     */
    form!: FormGroup<FormModelGroup<TOptions>>;

    /**
     * Defines dynamic item source which properties are edited
     */
    itemSource!: DynamicItemSource;

    test = true;

    public availableTypes: string[] = [];
}

export function getType(types: string[]): Type<PropertiesControl>
{
    @Component(
    {
        selector: 'generic-properties-control',
        templateUrl: 'genericPropertiesControl.component.html',
        standalone: true,
        imports:
        [
            CommonModule,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class GenericPropertiesControl<TOptions = any> extends DefaultGenericPropertiesControlComponent implements PropertiesControl<TOptions>
    {
        public override availableTypes: string[] = types;
    }

    return GenericPropertiesControl;
}