import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DynamicOutput, RelationsComponent, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {StaticInputRelationsMetadataLoader} from './staticInput.metadata';

/**
 * Static input component
 */
@Component(
{
    selector: 'static-input',
    templateUrl: 'staticInput.component.html',
    // styleUrls: ['relationsSampleClick.component.scss'],
    standalone: true,
    imports:
    [
        ReactiveFormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(StaticInputRelationsMetadataLoader)
export class StaticInputSAComponent implements RelationsComponent, OnInit, OnDestroy
{
    //######################### public static properties #########################

    /**
     * Gets relations id
     */
    public static get relationsId(): string
    {
        return 'static-input';
    }

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: unknown;

    //######################### protected properties - template bindings #########################

    /**
     * Defines form control for string value
     */
    protected stringForm: FormControl<string> = new FormControl<string>('', {nonNullable: true});

    /**
     * Defines form control for boolean value
     */
    protected booleanForm: FormControl<boolean> = new FormControl<boolean>(false, {nonNullable: true});

    //######################### public properties - outputs #########################

    /**
     * String output
     */
    @DynamicOutput()
    public stringOutput: string|undefined|null;

    /**
     * Boolean output
     */
    @DynamicOutput()
    public booleanOutput: boolean|undefined|null;

    //######################### constructor #########################
    constructor(private _changeDetector: ChangeDetectorRef,
                private _relationsProcessor: RelationsProcessor,
                private _componentManager: RelationsComponentManager,)
    {
        this.stringForm.valueChanges.subscribe(value => this.stringOutput = value);
        this.booleanForm.valueChanges.subscribe(value => this.booleanOutput = value);
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        this._componentManager.registerComponent(StaticInputSAComponent.relationsId, this);
        await this._relationsProcessor.initialized;
        this._relationsProcessor.updateRelations(StaticInputSAComponent.relationsId);
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._relationsProcessor.destroyComponent(StaticInputSAComponent.relationsId);
        this._componentManager.unregisterComponent(StaticInputSAComponent.relationsId);
    }

    //######################### public methods - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }
}