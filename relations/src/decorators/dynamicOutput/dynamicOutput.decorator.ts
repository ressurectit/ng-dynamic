import {Subject} from 'rxjs';

/**
 * Creates dynamic output for property
 */
export function DynamicOutput(): PropertyDecorator
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
    };
}