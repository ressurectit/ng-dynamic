import {Component, ChangeDetectionStrategy, ValueProvider} from '@angular/core';
import {ComponentRoute, ComponentRedirectRoute} from '@anglr/common/router';
import {LayoutComponentMetadata} from '@anglr/dynamic';
import {ComponentStylingOptions, LayoutComponentRendererDirectiveOptions, MissingTypeBehavior, TextFontWeight} from '@anglr/dynamic/layout';
import {TextBlockComponentOptions, StackPanelComponentOptions} from '@anglr/dynamic/basic-components';
import {LAYOUT_DESIGNER_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout-editor';

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
            provide: LayoutComponentRendererDirectiveOptions,
            useValue: new LayoutComponentRendererDirectiveOptions(MissingTypeBehavior.ShowNotFound)
        },
        LAYOUT_DESIGNER_COMPONENT_TRANSFORM
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
        id: 'stackPanelTest',
        name: 'stackPanel',
        options: <StackPanelComponentOptions&ComponentStylingOptions>
        {
            padding:
            {
                top: '20px'
            },
            children:
            [
                {
                    package: 'basic-components',
                    id: 'textTest',
                    name: 'textBlock',
                    options: <TextBlockComponentOptions&ComponentStylingOptions>
                    {
                        text: 'toto je text',
                        margin:
                        {
                            top: '10px'
                        },
                        textStyling:
                        {
                            fontSize: '20px'
                        }
                    }
                },
                {
                    package: 'basic-components',
                    id: 'text2Test',
                    name: 'textBlock',
                    options: <TextBlockComponentOptions&ComponentStylingOptions>
                    {
                        text: 'druhý riadok je toto',
                        textStyling:
                        {
                            fontWeight: TextFontWeight.Bold
                        }
                    }
                }
            ]
        }
    };

    protected metadata2: LayoutComponentMetadata =
    {
        package: 'basic-components',
        id: 'stackPanel',
        name: 'stackPanel',
        options: <StackPanelComponentOptions&ComponentStylingOptions>
        {
            padding:
            {
                top: '5px',
                bottom: '10px'
            },
            children:
            [
                {
                    package: 'basic-components',
                    id: 'text1',
                    name: 'textBlock',
                    options: <TextBlockComponentOptions&ComponentStylingOptions>
                    {
                        text: 'Ďalší text'
                    }
                },
                {
                    package: 'basic-components',
                    id: 'text2',
                    name: 'textBlock',
                    options: <TextBlockComponentOptions&ComponentStylingOptions>
                    {
                        text: 'ajajajaaaj'
                    }
                }
            ]
        }
    };

    //######################### constructor #########################
    constructor()
    {
    }
}
