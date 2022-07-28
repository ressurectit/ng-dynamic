import {ModuleWithProviders, NgModule} from '@angular/core';
import {DynamicLayoutModule} from '@anglr/dynamic/layout';

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
     */
    public static withProviders(designerLayout: boolean = true): ModuleWithProviders<DynamicLayoutEditorModule>
    {
        return {
            ngModule: DynamicLayoutEditorModule,
            providers:
            [
                provideLayoutEditor(designerLayout),
            ]
        };
    }
}