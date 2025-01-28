import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';

/**
 * Component used for displaying configuration of sync property
 */
@Component(
{
    selector: 'configure-sync-property',
    templateUrl: 'configureSyncProperty.component.html',
    imports:
    [
        ReactiveFormsModule,
        MatDialogModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigureSyncPropertyComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Instance of form control that is bound sync property name
     */
    protected control: FormControl<string> = new FormControl();

    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) data: string,)
    {
        this.control.setValue(data);
    }
}