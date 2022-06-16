import {Component, ChangeDetectionStrategy, ValueProvider} from '@angular/core';
import {ComponentRoute, ComponentRedirectRoute} from '@anglr/common/router';
import {LayoutComponentMetadata, LayoutComponentRendererOptions, MissingTypeBehavior} from '@anglr/dynamic';

/**
 * Home component
 */
@Component(
{
    selector: 'home-view',
    templateUrl: 'home.component.html',
    providers: 
    [
        <ValueProvider>
        {
            provide: LayoutComponentRendererOptions,
            useValue: new LayoutComponentRendererOptions(MissingTypeBehavior.ShowNotFound)
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRedirectRoute('', 'home')
@ComponentRoute({path: 'home'})
export class HomeComponent
{
    //######################### protected properties - template bindings #########################

    protected metadata: LayoutComponentMetadata =
    {
        package: 'basic-components',
        id: 'test',
        name: 'stacka',
        options: {}
    };

    //######################### constructor #########################
    constructor()
    {
    }
}
