import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentRoute, ComponentRedirectRoute} from '@anglr/common/router';
import {DynamicItemLoader} from '@anglr/dynamic/layout';

/**
 * Home component
 */
@Component(
{
    selector: 'home-view',
    templateUrl: 'home.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRedirectRoute('', 'home')
@ComponentRoute({path: 'home'})
export class HomeComponent
{
    //######################### constructor #########################
    constructor(dynamicItemLoader: DynamicItemLoader)
    {
        console.log(dynamicItemLoader);
    }
}
