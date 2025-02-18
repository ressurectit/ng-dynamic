import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {Grid, ShowMetadataSelectorForDirective} from '@anglr/grid';

import {ShowMetadataSelectorButtonComponentOptions, ShowMetadataSelectorButtonRelationsOptions} from './showMetadataSelectorButton.options';
import {ShowMetadataSelectorButtonLayoutMetadataLoader, ShowMetadataSelectorButtonRelationsMetadataLoader} from './showMetadataSelectorButton.metadata';

/**
 * Component used for displaying show metadata selector button
 */
@Component(
{
    selector: 'show-metadata-selector-button',
    templateUrl: 'showMetadataSelectorButton.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        ShowMetadataSelectorForDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(ShowMetadataSelectorButtonRelationsMetadataLoader)
@LayoutEditorMetadata(ShowMetadataSelectorButtonLayoutMetadataLoader)
export class ShowMetadataSelectorButtonComponent extends LayoutComponentBase<ShowMetadataSelectorButtonComponentOptions> implements RelationsComponent<ShowMetadataSelectorButtonRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: ShowMetadataSelectorButtonRelationsOptions|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Instance of grid
     */
    @Input()
    public grid: Grid|undefined|null;
}