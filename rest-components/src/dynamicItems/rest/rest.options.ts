import {RestParam} from './misc/interfaces';
import {MethodType} from './misc/types';

/**
 * Options for rest relations
 */
export interface RestRelationsOptions
{
    /**
     * Url to be called
     */
    url: string|undefined|null;

    /**
     * Method that is used
     */
    method: MethodType|undefined|null;

    /**
     * Indication whether run request immediately, or only when some input property has changed
     */
    runImmediately: boolean|undefined|null;

    /**
     * Array of parameters to be used
     */
    params: RestParam[]|undefined|null;
}