import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {DataLoaderComponentOptions} from '../dataLoader.options';
import {DataLoaderComponent} from '../dataLoader.component';

/**
 * Component used for displaying data loader designer
 */
@Component(
{
    selector: 'data-loader-designer',
    templateUrl: 'dataLoaderDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataLoaderDesignerComponent extends DataLoaderComponent implements LayoutComponent<DataLoaderComponentOptions>
{
}