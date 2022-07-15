import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, ChangeDetectorRef, SimpleChanges} from '@angular/core';
import {RelationsComponent, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {nameof} from '@jscrpt/common';

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
export class RelationsResultComponent implements RelationsComponent, OnInit, OnDestroy
{
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
        this._componentManager.registerComponent('relations-result', this);
        await this._relationsProcessor.initialized;
        this._relationsProcessor.updateRelations('relations-result');
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
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