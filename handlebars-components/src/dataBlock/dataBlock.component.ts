import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {DataBlockComponentOptions} from './dataBlock.options';
import {DataBlockLayoutMetadataLoader, DataBlockRelationsMetadataLoader} from './dataBlock.metadata';

/**
 * Component used for displaying data block
 */
@Component(
{
    selector: 'data-block',
    templateUrl: 'dataBlock.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(DataBlockRelationsMetadataLoader)
@LayoutEditorMetadata(DataBlockLayoutMetadataLoader)
export class DataBlockSAComponent extends LayoutComponentBase<DataBlockComponentOptions> implements LayoutComponent<DataBlockComponentOptions>, RelationsComponent
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;

    //######################### public properties - inputs #########################
}