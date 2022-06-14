import {NgModule, ModuleWithProviders} from "@angular/core";

import {ComponentRendererDirective} from "../directives/componentRenderer/componentRenderer.directive";
import {NG_DYNAMIC_MODULE_LOADERS_PROVIDER} from "../dynamicModuleLoader/ngDynamicModuleLoader";
import {DYNAMIC_NODE_LOADERS_PROVIDER} from "../dynamicNodeLoader/ngDynamicNodeLoader";

/**
 * Module for ng dynamic core 
 */
@NgModule(
{
    imports:
    [
    ],
    declarations: 
    [
        ComponentRendererDirective
    ],
    exports:
    [
        ComponentRendererDirective
    ]
})
export class NgDynamicCoreModule
{
    //######################### public methods #########################

    /**
     * Gets NgDynamicCoreModule with providers for root module
     */
    public static forRoot(): ModuleWithProviders 
    {
        return {
            ngModule: NgDynamicCoreModule,
            providers: 
            [
                NG_DYNAMIC_MODULE_LOADERS_PROVIDER,
                DYNAMIC_NODE_LOADERS_PROVIDER
            ]
        };
    }
}