import {Component, ChangeDetectionStrategy, SimpleChanges, ChangeDetectorRef, Input, OnInit, OnDestroy} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DynamicOutput, RelationsComponent, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {DynamicOnChanges} from '@anglr/dynamic';
import {nameof} from '@jscrpt/common';

import {RelationsSampleClickRelationsMetadataLoader} from './relationsSampleClick.metadata';

/**
 * Sample relations click component
 */
@Component(
{
    selector: 'relations-sample-click',
    templateUrl: 'relationsSampleClick.component.html',
    imports:
    [
        ReactiveFormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(RelationsSampleClickRelationsMetadataLoader)
export class RelationsSampleClickComponent implements RelationsComponent, OnInit, OnDestroy, DynamicOnChanges
{
    //######################### public static properties #########################

    /**
     * Gets relations id
     */
    public static get relationsId(): string
    {
        return 'relations-sample-click';
    }

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: unknown;

    //######################### protected properties - template bindings #########################

    /**
     * Defines form control for vystup value
     */
    protected _vystupForm: FormControl<string> = new FormControl<string>('', {nonNullable: true});

    //######################### public properties - inputs #########################

    /**
     * Test input for data
     */
    @Input({required: true})
    public vstup!: string;

    //######################### public properties - outputs #########################

    /**
     * Test output
     */
    @DynamicOutput()
    public vystup: string|undefined|null;

    //######################### constructor #########################
    constructor(private _changeDetector: ChangeDetectorRef,
                private _relationsProcessor: RelationsProcessor,
                private _componentManager: RelationsComponentManager,)
    {
        this._vystupForm.valueChanges.subscribe(value => this.vystup = value);
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        this._componentManager.registerComponent(RelationsSampleClickComponent.relationsId, this);
        await this._relationsProcessor.initialized;
        this._relationsProcessor.updateRelations(RelationsSampleClickComponent.relationsId);
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._relationsProcessor.destroyComponent(RelationsSampleClickComponent.relationsId);
        this._componentManager.unregisterComponent(RelationsSampleClickComponent.relationsId);
    }

    //######################### public methods - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public dynamicOnChanges?(changes: SimpleChanges): void
    {
        if(nameof<RelationsSampleClickComponent>('vstup') in changes && this.vstup)
        {
            console.log('vstup sa zmenil', this.vstup);
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }
}