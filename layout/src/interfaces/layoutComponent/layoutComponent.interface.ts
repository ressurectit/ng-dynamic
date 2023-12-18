import {DynamicAfterViewInit, DynamicItem, DynamicItemExtension, DynamicOnChanges, DynamicOnInit} from '@anglr/dynamic';

/**
 * Description of layout component
 */
export interface LayoutComponent<TOptions = any> extends DynamicItem, DynamicOnInit, DynamicOnChanges, DynamicAfterViewInit
{
    //######################### properties #########################

    /**
     * Options used for rendering this component
     */
    options: TOptions|undefined|null;

    //######################### methods #########################

    /**
     * Registers extensions for component
     * @param extensions - Array of extensions that should be added to component
     */
    registerExtensions(extensions: DynamicItemExtension[]): void;
}