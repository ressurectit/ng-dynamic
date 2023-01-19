import {Injector, NgZone, SimpleChanges} from '@angular/core';
import {PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {isPresent, nameof} from '@jscrpt/common';
import {Subject} from 'rxjs';

import {DebounceValueRelationsMetadataLoader} from './debounceValue.metadata';
import {DebounceValueRelationsOptions} from './debounceValue.options';

/**
 * Debounce value relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(DebounceValueRelationsMetadataLoader)
export class DebounceValueRelations<TValue = any> implements RelationsComponent<DebounceValueRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Subject used for emitting change in value
     */
    protected valueChange: Subject<void> = new Subject<void>();

    /**
     * Indication that initial data transfer should be skipped
     */
    protected valueSkipInit: boolean = true;

    /**
     * Reference number to timeout instance
     */
    protected timeout: number|null = null;

    /**
     * Instance of ng zone
     */
    protected ngZone: NgZone;

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
    }

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
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
                this.timeout = setTimeout(() => this.valueChange.next(), this.relationsOptions?.delay ?? 0) as any;
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