import {Directive, FactoryProvider, inject} from '@angular/core';

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
            useFactory: () => inject(RelationsComponentManager, {skipSelf: true}).openScope('12312312')
        }
    ],
})
export class ScopedRelationsSADirective
{
}