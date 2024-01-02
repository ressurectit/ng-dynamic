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
        loadChildren: () => import('../pages/+relationsStatic/relationsStatic.module').then(({RelationsStaticModule}) => RelationsStaticModule)
    },
    {
        path: 'relationsEditor',
        loadChildren: () => import('../pages/+relationsEditor/relationsEditor.module').then(({RelationsEditorModule}) => RelationsEditorModule)
    },
    {
        path: 'relationsWithEditor',
        loadChildren: () => import('../pages/+relationsWithEditor/relationsWithEditor.module').then(({RelationsWithEditorModule}) => RelationsWithEditorModule)
    },
    {
        path: 'relationsWithLayoutEditor',
        loadChildren: () => import('../pages/+relationsWithLayoutEditor/relationsWithLayoutEditor.module').then(({RelationsWithLayoutEditorModule}) => RelationsWithLayoutEditorModule)
    },
    {
        path: 'relationsComplex',
        loadChildren: () => import('../pages/+relationsComplex/relationsComplex.module').then(({RelationsComplexModule}) => RelationsComplexModule)
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