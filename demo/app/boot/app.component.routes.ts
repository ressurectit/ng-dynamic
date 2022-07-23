import {Type} from '@angular/core';
import {ModuleRoutesOptions} from '@anglr/common/router';

import {accessDeniedRoute} from '../pages/accessDenied/accessDenied.route';
import {notFoundRoute} from '../pages/notFound/notFound.route';

export const components: Type<any>[] =
[
];

export const routesOptions: ModuleRoutesOptions =
{
    rootModule: true,
    rootModuleConfig:
    {
        enableTracing: false,
        useHash: true
        // preloadingStrategy: PreloadAllModules
    },
    staticRoutesBefore:
    [
        {
            path: '',
            redirectTo: '/layout/preview',
            pathMatch: 'full'
        },
        {
            path: '',
            loadChildren: () => import('../pages/+default/default.module').then(({DefaultModule}) => DefaultModule)
        },
        {
            path: 'layout',
            loadChildren: () => import('../pages/+layout/layout.module').then(({LayoutModule}) => LayoutModule)
        },
        {
            path: 'layout',
            loadChildren: () => import('../pages/+layoutEditor/layoutEditor.module').then(({LayoutEditorModule}) => LayoutEditorModule)
        }
    ],
    staticRoutesAfter:
    [
        accessDeniedRoute,
        notFoundRoute,
    ]
};