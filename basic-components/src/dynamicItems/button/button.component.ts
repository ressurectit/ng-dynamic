import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {DebugData, DynamicOutput, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata, VoidObject} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {nameof, PromiseOr} from '@jscrpt/common';

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
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DebugData(
{
    inputs:
    [
        nameof<ButtonSAComponent>('disabled'),
    ],
    outputs:
    [
        nameof<ButtonSAComponent>('click'),
    ],
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

    //######################### public properties - inputs #########################

    /**
     * Indication whether is button disabled
     */
    @Input()
    public disabled: boolean = false;

    //######################### public properties - dynamic outputs #########################

    /**
     * Output used for emitting new void object value when clicked
     */
    @DynamicOutput({skipInit: true, sync: true})
    public click: VoidObject = {};

    //######################### protected - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): PromiseOr<void>
    {
        this.disabled = this.options?.disabled ?? false;
    }
}