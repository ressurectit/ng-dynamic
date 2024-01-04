import {Routes} from '@angular/router';
import {extractRoutes} from '@anglr/common/router';

import {accessDeniedRoute} from '../pages/accessDenied/accessDenied.route';
import {notFoundRoute} from '../pages/notFound/notFound.route';

export const routes: Routes =
[
    {
        path: '',
        redirectTo: '/layout/preview',
        pathMatch: 'full'
    },
    {
        path: 'layout',
        loadChildren: () => import('../pages/+layout/layout.module')
    },
    {
        path: 'layout',
        loadChildren: () => import('../pages/+layoutEditor/layoutEditor.module')
    },
    {
        path: 'relationsStatic',
        loadChildren: () => import('../pages/+relationsStatic/relationsStatic.module')
    },
    {
        path: 'relationsEditor',
        loadChildren: () => import('../pages/+relationsEditor/relationsEditor.module')
    },
    {
        path: 'layoutRelationsEditor',
        loadChildren: () => import('../pages/+layoutRelationsEditor/layoutRelationsEditor.module')
    },
    {
        path: 'layoutRelationsAllFeatures',
        loadChildren: () => import('../pages/+layoutRelationsAllFeatures/layoutRelationsAllFeatures.module')
    },
    {
        path: 'relationsLayoutForm',
        loadChildren: () => import('../pages/+relationsLayoutForm/relationsLayoutForm.module').then(({RelationsLayoutFormModule}) => RelationsLayoutFormModule)
    },
    ...extractRoutes(
    [
    ]),
    accessDeniedRoute,
    notFoundRoute,
];