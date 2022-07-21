import {Component, ChangeDetectionStrategy, SimpleChanges} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {ButtonComponentOptions} from './button.options';
import {ButtonLayoutMetadataLoader, ButtonRelationsMetadataLoader} from './button.metadata';

/**
 * Component used for displaying button
 */
@Component(
{
    selector: 'button-component',
    templateUrl: 'button.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(ButtonRelationsMetadataLoader)
@LayoutEditorMetadata(ButtonLayoutMetadataLoader)
export class ButtonSAComponent extends LayoutComponentBase<ButtonComponentOptions> implements LayoutComponent<ButtonComponentOptions>, RelationsComponent
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        // if(nameof<SampleChangeRelations>('vstup') in changes && this.vstup)
        // {
        //     console.log('value changes', this.vstup);

        //     this.vystup = `${this.vstup} changes!`;
        // }
    }
}