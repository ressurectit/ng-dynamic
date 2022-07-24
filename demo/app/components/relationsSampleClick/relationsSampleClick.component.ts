import {Component, ChangeDetectionStrategy, SimpleChanges, ChangeDetectorRef, Input, OnInit, OnDestroy} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DynamicOutput, RelationsComponent, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {RelationsSampleClickRelationsMetadataLoader} from './relationsSampleClick.metadata';

/**
 * Sample relations click component
 */
@Component(
{
    selector: 'relations-sample-click',
    templateUrl: 'relationsSampleClick.component.html',
    // styleUrls: ['relationsSampleClick.component.scss'],
    standalone: true,
    imports:
    [
        ReactiveFormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(RelationsSampleClickRelationsMetadataLoader)
export class RelationsSampleClickSAComponent implements RelationsComponent, OnInit, OnDestroy
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
    public relationsOptions: any;

    //######################### protected properties - template bindings #########################

    /**
     * Defines form control for vystup value
     */
    protected _vystupForm: FormControl<string> = new FormControl<string>('');

    //######################### public properties - inputs #########################

    /**
     * Test input for data
     */
    @Input()
    public vstup: string;

    //######################### public properties - outputs #########################

    /**
     * Test output
     */
    @DynamicOutput()
    public vystup: string;

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
        this._componentManager.registerComponent(RelationsSampleClickSAComponent.relationsId, this);
        await this._relationsProcessor.initialized;
        this._relationsProcessor.updateRelations(RelationsSampleClickSAComponent.relationsId);
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._relationsProcessor.destroyComponent(RelationsSampleClickSAComponent.relationsId);
        this._componentManager.unregisterComponent(RelationsSampleClickSAComponent.relationsId);
    }

    //######################### public methods - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<RelationsSampleClickSAComponent>('vstup') in changes && this.vstup)
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