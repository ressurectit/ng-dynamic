import {ModuleWithProviders, NgModule} from '@angular/core';
import {DynamicLayoutModule} from '@anglr/dynamic/layout';
import {DefaultDynamicPackage} from '@anglr/dynamic';

import {LayoutEditorSAComponent} from '../components';
import {provideLayoutEditor} from '../misc/utils';

/**
 * Module contains components, directives, pipes for dynamic layout editor rendering
 */
@NgModule(
{
    imports:
    [
        LayoutEditorSAComponent,
    ],
    exports:
    [
        LayoutEditorSAComponent,
        DynamicLayoutModule,
    ],
})
export class DynamicLayoutEditorModule
{
    //######################### public methods #########################

    /**
     * Creates DynamicLayoutEditorModule extended with providers
     * @param designerLayout - Indication whether provide extractor for layout designer types
     * @param packages - Array of default packages to be used, if omitted all built-in packages are used
     */
    public static withProviders(designerLayout: boolean = true,
                                packages?: DefaultDynamicPackage[]): ModuleWithProviders<DynamicLayoutEditorModule>
    {
        return {
            ngModule: DynamicLayoutEditorModule,
            providers:
            [
                provideLayoutEditor(designerLayout, packages),
            ]
        };
    }
}