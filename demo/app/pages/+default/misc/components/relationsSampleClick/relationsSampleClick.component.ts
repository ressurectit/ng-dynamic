import {Component, ChangeDetectionStrategy, SimpleChanges, ChangeDetectorRef, Input, OnInit, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DynamicOutput, RelationsComponent, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {nameof} from '@jscrpt/common';

/**
 * Sample relations click component
 */
@Component(
{
    selector: 'relations-sample-click',
    templateUrl: 'relationsSampleClick.component.html',
    // styleUrls: ['relationsSampleClick.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsSampleClickComponent implements RelationsComponent, OnInit, OnDestroy
{
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
        this._componentManager.registerComponent('relations-sample-click', this);
        await this._relationsProcessor.initialized;
        this._relationsProcessor.updateRelations('relations-sample-click');
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