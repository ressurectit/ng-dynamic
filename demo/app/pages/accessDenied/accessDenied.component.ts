import {Component} from '@angular/core';
import {StatusCodeService} from '@anglr/common';

import {AnimateRouteDirective} from '../../directives';

/**
 * Component used for displaying access denied page
 */
@Component(
{
    selector: 'access-denied-view',
    templateUrl: 'accessDenied.component.html',
    hostDirectives:
    [
        AnimateRouteDirective,
    ],
})
export default class AccessDeniedComponent
{
    //######################### constructor #########################
    constructor(statusCodeService: StatusCodeService)
    {
        statusCodeService.setStatusCode(403);
    }
}