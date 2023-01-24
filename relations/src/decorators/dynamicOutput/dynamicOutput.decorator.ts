import {Subject} from 'rxjs';

import {defineAssignedProp, defineSkipInitProp} from '../../misc/utils';
import {RelationsChangeDetector, RelationsComponentManager} from '../../services';
import {RelationsWithInjector} from '../../services/relationsChangeDetector/relationsChangeDetector.interface';

/**
 * Creates dynamic output for property
 * @param options - Options that allows configure dynamic output
 *
 * `skipInit` - Means that there will be no initial data transfer for this output
 * `sync` - Means that changes will be transfered synchronously, right away
 */
export function DynamicOutput(options?: {skipInit?: boolean; sync?: boolean}): PropertyDecorator
{
    return function(target: any, propertyKey: string|symbol)
    {
        const prop = propertyKey as string;

        Object.defineProperty(target,
                              `${prop}Change`,
                              {
                                  get: function()
                                  {
                                      if(!this[`ɵ${prop}Change`])
                                      {
                                          this[`ɵ${prop}Change`] = new Subject<void>();
                                      }

                                      return this[`ɵ${prop}Change`];
                                  }
                              });

        Object.defineProperty(target,
                              prop,
                              {
                                  get: function()
                                  {
                                      return this[`ɵ${prop}`];
                                  },
                                  set: function(value: any)
                                  {
                                      this[`ɵ${prop}`] = value;
                                      defineAssignedProp(this, prop);

                                      if(options?.sync)
                                      {
                                          this[`${prop}Change`].next();
                                      }
                                      else
                                      {
                                          const injector = (this as RelationsWithInjector).ɵɵinjector;

                                          if(!injector)
                                          {
                                              return;
                                          }

                                          const componentManager = injector.get(RelationsComponentManager);
                                          const changeDetector = injector.get(RelationsChangeDetector);
                                          const id = componentManager.getId(this);

                                          if(!id)
                                          {
                                              return;
                                          }

                                          changeDetector.markForCheck(
                                          {
                                              componentId: id,
                                              outputName: prop,
                                          });
                                      }
                                  }
                              });

        if(options?.skipInit)
        {
            defineSkipInitProp(target, prop);
        }
    };
}