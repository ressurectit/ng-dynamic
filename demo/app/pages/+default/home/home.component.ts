import {Component, ChangeDetectionStrategy, ValueProvider} from '@angular/core';
import {ComponentRoute, ComponentRedirectRoute} from '@anglr/common/router';
import {LayoutComponentMetadata} from '@anglr/dynamic';
import {LayoutComponentRendererOptions, MissingTypeBehavior} from '@anglr/dynamic/layout';
import {TextBlockComponentOptions} from '@anglr/dynamic/basic-components';

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
        id: 'textTest',
        name: 'textBlock',
        options: <TextBlockComponentOptions>
        {
            text: 'toto je text'
        }
    };

    //######################### constructor #########################
    constructor()
    {
    }
}
