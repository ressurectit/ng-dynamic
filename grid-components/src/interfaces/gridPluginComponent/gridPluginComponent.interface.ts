import {LayoutComponent} from '@anglr/dynamic/layout';
import {Grid, GridPlugin, PluginDescription, PluginOptions} from '@anglr/grid';
import {RecursivePartial} from '@jscrpt/common';

/**
 * Definition of component that provides grid plugin
 */
export interface GridPluginComponent<TPlugin extends GridPlugin, TOptions, TPluginOptions extends PluginOptions = PluginOptions> extends LayoutComponent<TOptions>
{
    /**
     * Description of plugin that will be used in grid
     */
    pluginDescription: PluginDescription<TPlugin, RecursivePartial<TPluginOptions>>;

    /**
     * Sets grid instance to this type
     * @param grid - Instance of grid
     */
    setGridInstance(grid: Grid): void;
}