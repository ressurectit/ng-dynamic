import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {CustomComponentComponentOptions} from './customComponent.options';
import {CustomComponentLayoutMetadataLoader, CustomComponentRelationsMetadataLoader} from './customComponent.metadata';

/**
 * Component used for displaying custom component
 */
@Component(
{
    selector: 'custom-component',
    template: '',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(CustomComponentRelationsMetadataLoader)
@LayoutEditorMetadata(CustomComponentLayoutMetadataLoader)
export class CustomComponentSAComponent extends LayoutComponentBase<CustomComponentComponentOptions> implements LayoutComponent<CustomComponentComponentOptions>, RelationsComponent
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;
}