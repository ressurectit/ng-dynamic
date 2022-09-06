import {Subscription} from 'rxjs';

/**
 * Data stored in component itself about relations
 */
export interface RelationsComponentManagerComponentData
{
    /**
     * Unique generated id for component registered in relations
     */
    ɵɵRelationsComponentId?: string;

    /**
     * Array of subscriptions for changes of outputs for component
     */
    ɵɵRelationsOutputsChangeSubscriptions?: Subscription[];

    /**
     * Indication whether were relations options initialized for component
     */
    ɵɵRelationsOptionsInitialized?: boolean;
}