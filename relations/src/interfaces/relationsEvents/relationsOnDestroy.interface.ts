/**
 * Interface that describes relations on destroy phase
 */
export interface RelationsOnDestroy
{
    /**
     * Called when relations is being destroyd to cleaup resources
     */
    relationsOnDestroy?(): void;
}
