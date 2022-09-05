import {Directive, FactoryProvider, inject} from '@angular/core';
import {SCOPE_ID} from '@anglr/dynamic';

import {RelationsComponentManager} from '../../services';

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
        }
    ],
})
export class ScopedRelationsSADirective
{
}