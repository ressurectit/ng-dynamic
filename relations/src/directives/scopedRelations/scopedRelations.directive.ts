import {Directive, FactoryProvider, Inject, inject, Injector, OnDestroy} from '@angular/core';
import {SCOPE_ID} from '@anglr/dynamic';

import {RelationsComponentManager, RelationsProcessor} from '../../services';

/**
 * Creates scoped relations component manager and processor
 */
@Directive(
{
    selector: '[scopedRelations]',
    standalone: true,
    providers:
    [
        <FactoryProvider>
        {
            provide: RelationsComponentManager,
            useFactory: () => inject(RelationsComponentManager, {skipSelf: true}).openScope(inject(SCOPE_ID))
        },
        <FactoryProvider>
        {
            provide: RelationsProcessor,
            useFactory: () => inject(RelationsProcessor, {skipSelf: true}).openScope(inject(SCOPE_ID), inject(RelationsComponentManager), inject(Injector))
        }
    ],
})
export class ScopedRelationsSADirective implements OnDestroy
{
    //######################### constructor #########################
    constructor(protected componentManager: RelationsComponentManager,
                protected relationsProcessor: RelationsProcessor,
                @Inject(SCOPE_ID) protected scopeId: string,)
    {
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.componentManager.ngOnDestroy();
        this.relationsProcessor.destroyScope();
    }
}