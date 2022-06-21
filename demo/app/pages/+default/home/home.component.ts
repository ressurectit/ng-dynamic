import {Component, ChangeDetectionStrategy, ValueProvider} from '@angular/core';
import {ComponentRoute, ComponentRedirectRoute} from '@anglr/common/router';
import {ComponentStylingOptions, LayoutComponentRendererDirectiveOptions, MissingTypeBehavior, TextFontWeight, LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {TextBlockComponentOptions, GridPanelComponentOptions, GridPanelCellComponentOptions} from '@anglr/dynamic/basic-components';
import {LayoutMetadataManager, LAYOUT_DESIGNER_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout-editor';

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
        LAYOUT_DESIGNER_COMPONENT_TRANSFORM,
        LayoutMetadataManager,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRedirectRoute('', 'home')
@ComponentRoute({path: 'home'})
export class HomeComponent
{
    //######################### protected properties - template bindings #########################

    // protected metadata: LayoutComponentMetadata =
    // {
    //     package: 'basic-components',
    //     id: 'stackPanelTest',
    //     name: 'stackPanel',
    //     options: <StackPanelComponentOptions&ComponentStylingOptions>
    //     {
    //         padding:
    //         {
    //             top: '20px'
    //         },
    //         children:
    //         [
    //             {
    //                 package: 'basic-components',
    //                 id: 'textTest',
    //                 name: 'textBlock',
    //                 options: <TextBlockComponentOptions&ComponentStylingOptions>
    //                 {
    //                     text: 'toto je text',
    //                     margin:
    //                     {
    //                         top: '10px'
    //                     },
    //                     textStyling:
    //                     {
    //                         fontSize: '20px'
    //                     }
    //                 }
    //             },
    //             {
    //                 package: 'basic-components',
    //                 id: 'text2Test',
    //                 name: 'textBlock',
    //                 options: <TextBlockComponentOptions&ComponentStylingOptions>
    //                 {
    //                     text: 'druhý riadok je toto',
    //                     textStyling:
    //                     {
    //                         fontWeight: TextFontWeight.Bold
    //                     }
    //                 }
    //             }
    //         ]
    //     }
    // };
    protected metadata: LayoutComponentMetadata =
    {
        package: 'basic-components',
        id: 'gridPanelTest',
        name: 'gridPanel',
        options: <GridPanelComponentOptions&ComponentStylingOptions>
        {
            padding:
            {
                top: '20px'
            },
            columns:
            [
                {
                    width: '1fr'
                },
                {
                    width: '2fr'
                },
                {
                    width: '60px'
                },
            ],
            rows:
            [
                {
                    height: '300px'
                },
            ],
            cells:
            [
                // {
                //     package: 'basic-components',
                //     id: 'gridPanelTest-r1-2-c2-3',
                //     name: 'gridPanelCell',
                //     options: <GridPanelCellComponentOptions>
                //     {
                //         gridColumnStart: 2,
                //         gridColumnEnd: 4,
                //         gridRowStart: 1,
                //         gridRowEnd: 2,
                //         component:
                //         {
                //             package: 'basic-components',
                //             id: 'text2Test',
                //             name: 'textBlock',
                //             options: <TextBlockComponentOptions&ComponentStylingOptions>
                //             {
                //                 text: 'druhý riadok je toto',
                //                 textStyling:
                //                 {
                //                     fontWeight: TextFontWeight.Bold
                //                 }
                //             }
                //         }
                //     }
                // },
                {
                    package: 'basic-components',
                    id: 'xxxxx',
                    name: 'gridPanelCell',
                    options: <GridPanelCellComponentOptions>
                    {
                        gridColumnStart: 1,
                        gridColumnEnd: 3,
                        gridRowStart: 1,
                        gridRowEnd: 2,
                        component:
                        {
                            package: 'basic-components',
                            id: 'textTest',
                            name: 'textBlock',
                            options: <TextBlockComponentOptions&ComponentStylingOptions>
                            {
                                text: 'aaaa',
                                textStyling:
                                {
                                    fontWeight: TextFontWeight.Bold
                                }
                            }
                        }
                    }
                },
            ]
        }
    };

    //######################### constructor #########################
    constructor(private _manager: LayoutMetadataManager,)
    {
    }

    //######################### protected methods - template bindings #########################

    /**
     * Gets metadata for current metadata manager
     */
    protected getMetadata(): void
    {
        console.log(this._manager.getMetadata());
    }
}
