import {Subject} from 'rxjs';

import {defineSkipInitProp} from '../../misc/utils';

/**
 * Creates dynamic output for property
 * @param options - Options that allows configure dynamic output
 * 
 * `skipInit` - Means that there will be no initial data transfer for this output
 */
export function DynamicOutput(options?: {skipInit?: boolean;}): PropertyDecorator
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
                                  set: function(value:any)
                                  {
                                      this[`ɵ${prop}`] = value;
                                      this[`${prop}Change`].next();
                                  }
                              });

        if(options?.skipInit)
        {
            defineSkipInitProp(target, prop);
        }
    };
}