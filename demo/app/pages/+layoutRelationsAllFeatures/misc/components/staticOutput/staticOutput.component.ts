import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnInit, OnDestroy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RelationsComponent, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {StaticOutputRelationsMetadataLoader} from './staticOutput.metadata';

/**
 * Static output component
 */
@Component(
{
    selector: 'static-output',
    templateUrl: 'staticOutput.component.html',
    imports:
    [
        ReactiveFormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(StaticOutputRelationsMetadataLoader)
export class StaticOutputComponent implements RelationsComponent, OnInit, OnDestroy
{
    //######################### public static properties #########################

    /**
     * Gets relations id
     */
    public static get relationsId(): string
    {
        return 'static-output';
    }

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: unknown;

    //######################### public properties - inputs #########################

    /**
     * Boolean input
     */
    @Input()
    public booleanInput: boolean|undefined|null;

    /**
     * String input
     */
    @Input()
    public stringInput: string|undefined|null;

    //######################### constructor #########################
    constructor(private _changeDetector: ChangeDetectorRef,
                private _relationsProcessor: RelationsProcessor,
                private _componentManager: RelationsComponentManager,)
    {
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        this._componentManager.registerComponent(StaticOutputComponent.relationsId, this);
        await this._relationsProcessor.initialized;
        this._relationsProcessor.updateRelations(StaticOutputComponent.relationsId);
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._relationsProcessor.destroyComponent(StaticOutputComponent.relationsId);
        this._componentManager.unregisterComponent(StaticOutputComponent.relationsId);
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }
}