import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {DynamicOutput, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {PromiseOr} from '@jscrpt/common';

import {ToggleButtonComponentOptions} from './toggleButton.options';
import {ToggleButtonLayoutMetadataLoader, ToggleButtonRelationsMetadataLoader} from './toggleButton.metadata';

/**
 * Component used for displaying toggle button
 */
@Component(
{
    selector: 'toggle-button',
    templateUrl: 'toggleButton.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(ToggleButtonRelationsMetadataLoader)
@LayoutEditorMetadata(ToggleButtonLayoutMetadataLoader)
export class ToggleButtonSAComponent extends LayoutComponentBase<ToggleButtonComponentOptions> implements LayoutComponent<ToggleButtonComponentOptions>, RelationsComponent
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;

    //######################### public properties - inputs #########################

    /**
     * Indication whether is toggle button disabled
     */
    @Input()
    public disabled: boolean = false;

    //######################### public properties - dynamic outputs #########################

    /**
     * Output used for emitting on/off state of toggle button
     */
    @DynamicOutput()
    public toggle: boolean|null = null;

    //######################### protected - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): PromiseOr<void>
    {
        this.disabled = this.options?.disabled ?? false;

        if(this.options?.state)
        {
            this.toggle = this.options.state;
        }
    }
}