import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {FirstUppercaseLocalizeSAPipe, TooltipDirective} from '@anglr/common';

/**
 * Component used for defining grid areas
 */
@Component(
{
    selector: 'grid-areas-definition-dialog',
    templateUrl: 'gridAreasDefinitionDialog.component.html',
    styleUrl: 'gridAreasDefinitionDialog.component.css',
    standalone: true,
    imports:
    [
        FirstUppercaseLocalizeSAPipe,
        TooltipDirective,
        MatDialogModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridAreasDefinitionDialogComponent
{
}