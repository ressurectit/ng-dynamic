/**
 * Options for sync values relations
 */
export interface SyncValuesRelationsOptions
{
    /**
     * Indication whether sync on trigger, otherwise on idle timeout
     */
    triggerSync: boolean|undefined|null;

    /**
     * Idle timeout that runs sync relations node logic
     */
    idleTimeout: number|undefined|null;

    /**
     * Array of properties that are synced
     */
    syncProperties: string[]|undefined|null;
}