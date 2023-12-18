import {Injector, NgZone, SimpleChanges} from '@angular/core';
import {DebugData, PureRelationsComponent, RelationsChangeDetector, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {isPresent, nameof} from '@jscrpt/common';
import {NEVER, Observable} from 'rxjs';

import {DebounceValueRelationsMetadataLoader} from './debounceValue.metadata';
import {DebounceValueRelationsOptions} from './debounceValue.options';

/**
 * Debounce value relations component
 */
@DebugData(
{
    inputs: 
    [
        nameof<DebounceValueRelations>('value'),
    ],
})
@PureRelationsComponent()
@RelationsEditorMetadata(DebounceValueRelationsMetadataLoader)
export class DebounceValueRelations<TValue = any> implements RelationsComponent<DebounceValueRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Subject used for emitting change in value
     */
    protected valueChange: Observable<void> = NEVER;

    /**
     * Indication that initial value was already assigned
     */
    protected valueAssigned: boolean = false;

    /**
     * Reference number to timeout instance
     */
    protected timeout: number|null = null;

    /**
     * Instance of ng zone
     */
    protected ngZone: NgZone;

    /**
     * Current relations change detector
     */
    protected relationsChangeDetector: RelationsChangeDetector;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: DebounceValueRelationsOptions|undefined|null;

    //######################### public properties - inputs/dynamic outputs #########################
    
    /**
     * Value that should be debounced
     */
    public value: TValue|undefined|null;

    //######################### constructor #########################
    constructor(injector: Injector,)
    {
        this.ngZone = injector.get(NgZone);
        this.relationsChangeDetector = injector.get(RelationsChangeDetector);
    }

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public dynamicOnChanges(changes: SimpleChanges): void
    {
        if(nameof<DebounceValueRelations>('value') in changes)
        {
            if(isPresent(this.timeout))
            {
                clearTimeout(this.timeout);
                this.timeout = null;
            }

            this.ngZone.runOutsideAngular(() =>
            {
                this.timeout = setTimeout(() =>
                {
                    this.valueAssigned = true;
                    
                    this.relationsChangeDetector.markForCheck(
                    {
                        componentId: this,
                        outputName: nameof<DebounceValueRelations>('value'),
                    });
                }, this.relationsOptions?.delay ?? 0) as unknown as number;
            });
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}