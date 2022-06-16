/**
 * Description of dynamic source of item
 */
export interface DynamicItemSource
{
    //######################### properties #########################

    /**
     * Name of package that contains requested item
     */
    package: string;

    /**
     * Name of item that is requested
     */
    name: string;
}
