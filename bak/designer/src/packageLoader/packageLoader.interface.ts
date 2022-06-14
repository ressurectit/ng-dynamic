import {DynamicModule} from "@anglr/dynamic";

/**
 * Description of package components
 */
export interface PackageComponents
{
    /**
     * Components in package 
     */
    [componentName: string]: DynamicModule;
}