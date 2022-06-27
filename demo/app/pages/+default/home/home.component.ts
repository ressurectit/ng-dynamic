import {Component, ChangeDetectionStrategy, ValueProvider, OnInit, OnDestroy} from '@angular/core';
import {ComponentRoute, ComponentRedirectRoute} from '@anglr/common/router';
import {ComponentStylingOptions, LayoutComponentRendererDirectiveOptions, MissingTypeBehavior, TextFontWeight, LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {TextBlockComponentOptions, StackPanelComponentOptions, GridPanelComponentOptions, GridPanelCellComponentOptions} from '@anglr/dynamic/basic-components';
import {LayoutEditorMetadataManager, LAYOUT_DESIGNER_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout-editor';

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
        LayoutEditorMetadataManager,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRedirectRoute('', 'home')
@ComponentRoute({path: 'home'})
export class HomeComponent implements OnInit, OnDestroy
{
    //######################### protected properties - template bindings #########################

    protected metadata: LayoutComponentMetadata =
    {
        id: 'gridPanelTest',
        package: 'basic-components',
        name: 'gridPanel',
        options: <GridPanelComponentOptions&ComponentStylingOptions>
        {
            columns:
            [
                {
                    width: '1fr'
                },
                {
                    width: '2fr'
                },
                {
                    width: '1fr'
                },
                {
                    width: '100px'
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
                {
                    id: 'celltest',
                    package: 'basic-components',
                    name: 'gridPanelCell',
                    options: <GridPanelCellComponentOptions>
                    {
                        gridColumnStart: 2,
                        gridColumnEnd: 3,
                        gridRowStart: 1,
                        gridRowEnd: 2,
                        component:
                        {
                            id: 'stackPanelTest',
                            package: 'basic-components',
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
                                                top: '10px',
                                                bottom: '6px',
                                                left: '12px',
                                                right: '14pt'
                                            },
                                            padding:
                                            {
                                                top: '8px',
                                                bottom: '8px',
                                                left: '12px',
                                                right: '12px'
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
                        }
                    }
                },
                {
                    id: 'anotherCell',
                    package: 'basic-components',
                    name: 'gridPanelCell',
                    options: <GridPanelCellComponentOptions>
                    {
                        gridColumnStart: 3,
                        gridColumnEnd: 4,
                        gridRowStart: 1,
                        gridRowEnd: 2,
                        component:
                        {
                            package: 'basic-components',
                            id: 'textJeTo',
                            name: 'textBlock',
                            options: <TextBlockComponentOptions>
                            {
                                text: 'nový text',
                            }
                        }
                    }
                },
                {
                    id: 'stackxxx',
                    package: 'basic-components',
                    name: 'gridPanelCell',
                    options: <GridPanelCellComponentOptions>
                    {
                        gridColumnStart: 4,
                        gridColumnEnd: 5,
                        gridRowStart: 1,
                        gridRowEnd: 2,
                        component:
                        {
                            id: 'stackPanelxxx',
                            package: 'basic-components',
                            name: 'stackPanel',
                            options: <StackPanelComponentOptions>
                            {
                                horizontal: true,
                                children: []
                            }
                        }
                    }
                },
            ]
        }
    };

    //######################### constructor #########################
    constructor(private _manager: LayoutEditorMetadataManager,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
    }

    //######################### protected methods - template bindings #########################

    /**
     * Gets metadata for current metadata manager
     */
    protected getMetadata(): void
    {
        console.log(this._manager.getMetadata());
        console.log(this._manager.root);
        console.log(this._manager.flatTree);
        console.log(this._manager.flatTree.map(itm => itm.component.options.typeMetadata.id));
        console.log(this._manager.flatTree.map(itm => itm.component.designerDropList).reverse());
    }
}
