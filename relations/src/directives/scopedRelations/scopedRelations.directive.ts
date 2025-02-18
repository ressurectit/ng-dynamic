import {Directive, FactoryProvider, inject, Injector, OnDestroy} from '@angular/core';
import {SCOPE_ID} from '@anglr/dynamic';
import {LayoutRenderer} from '@anglr/dynamic/layout';

import {RelationsChangeDetector, RelationsComponentManager, RelationsProcessor} from '../../services';

/**
 * Creates scoped relations component manager and processor
 */
@Directive(
{
    selector: '[scopedRelations]',
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
        },
        RelationsChangeDetector,
        LayoutRenderer,
    ],
})
export class ScopedRelationsDirective implements OnDestroy
{
    //######################### constructor #########################
    constructor(protected componentManager: RelationsComponentManager,
                protected relationsProcessor: RelationsProcessor,)
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