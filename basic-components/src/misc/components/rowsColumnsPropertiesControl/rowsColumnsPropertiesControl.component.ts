import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PropertiesControl, PropertiesControlBase} from '@anglr/dynamic/layout-editor';

import {RowsColumnsOptions} from '../../../interfaces';

/**
 * Component used for displaying editation of rows and columns
 */
@Component(
{
    selector: 'rows-columns-control',
    templateUrl: 'rowsColumnsPropertiesControl.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowsColumnsControlComponent extends PropertiesControlBase<RowsColumnsOptions> implements PropertiesControl<RowsColumnsOptions>
{
}
