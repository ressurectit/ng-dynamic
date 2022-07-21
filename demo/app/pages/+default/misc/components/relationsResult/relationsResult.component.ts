import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, ChangeDetectorRef, SimpleChanges} from '@angular/core';
import {RelationsComponent, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {RelationsResultRelationsMetadataLoader} from './relationsResult.metadata';

/**
 * Component used for displaying result binding of relations
 */
@Component(
{
    selector: 'relations-result',
    templateUrl: 'relationsResult.component.html',
    // styleUrls: ['relationsResult.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(RelationsResultRelationsMetadataLoader)
export class RelationsResultComponent implements RelationsComponent, OnInit, OnDestroy
{
    //######################### public static properties #########################

    /**
     * Gets relations id
     */
    public static get relationsId(): string
    {
        return 'relations-result';
    }

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;

    //######################### public properties - inputs #########################

    /**
     * Test input for data
     */
    @Input()
    public vstup: string;

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
        this._componentManager.registerComponent(RelationsResultComponent.relationsId, this);
        await this._relationsProcessor.initialized;
        this._relationsProcessor.updateRelations(RelationsResultComponent.relationsId);
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._relationsProcessor.destroyComponent(RelationsResultComponent.relationsId);
        this._componentManager.unregisterComponent(RelationsResultComponent.relationsId);
    }

    //######################### public methods - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<RelationsResultComponent>('vstup') in changes && this.vstup)
        {
            console.log('vstup sa zmenil v result', this.vstup);
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