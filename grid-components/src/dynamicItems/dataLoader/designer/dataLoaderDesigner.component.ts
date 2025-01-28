import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {DataLoaderComponentOptions} from '../dataLoader.options';
import {DataLoaderSAComponent} from '../dataLoader.component';

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
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataLoaderDesignerSAComponent extends DataLoaderSAComponent implements LayoutComponent<DataLoaderComponentOptions>
{
}