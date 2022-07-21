import {ComponentStylingOptions, LayoutComponentMetadata, TextFontWeight} from '@anglr/dynamic/layout';
import {ButtonComponentOptions, GridPanelCellComponentOptions, GridPanelComponentOptions, StackPanelComponentOptions, StackPanelFlexExtensionOptions, TextBlockComponentOptions} from '@anglr/dynamic/basic-components';
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';

/**
 * Class storing demo data
 */
export class DemoData
{
    public static demoLayout: LayoutComponentMetadata =
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
                                        id: 'textTest',
                                        package: 'basic-components',
                                        name: 'textBlock',
                                        options: <TextBlockComponentOptions&ComponentStylingOptions&StackPanelFlexExtensionOptions>
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
                                            },
                                            flex: '1'
                                        }
                                    },
                                    {
                                        id: 'text2Test',
                                        package: 'basic-components',
                                        name: 'textBlock',
                                        options: <TextBlockComponentOptions&ComponentStylingOptions>
                                        {
                                            text: 'druhý riadok je toto',
                                            textStyling:
                                            {
                                                fontWeight: TextFontWeight.Bold
                                            }
                                        }
                                    },
                                    {
                                        id: 'button-test',
                                        package: 'basic-components',
                                        name: 'button',
                                        options: <ButtonComponentOptions>
                                        {
                                            text: 'test btn',
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
                    id: 'gridCellxxx',
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

    public static relationsDemo: RelationsNodeMetadata[] =
    [
        {
            id: 'sample-source',
            package: 'basic-components',
            name: 'sampleSource',
            relationsOptions: null,
            outputs:
            [
                {
                    outputName: 'vystup',
                    inputs:
                    [
                        {
                            id: 'relations-sample-click',
                            inputName: 'vstup'
                        }
                    ]
                }
            ],
            nodeMetadata:
            {
                coordinates: 
                {
                    x: 30,
                    y: 60
                },
                options: null
            }
        },
        {
            id: 'relations-sample-click',
            package: 'static-components',
            name: 'relations-sample-click',
            relationsOptions: null,
            outputs:
            [
                {
                    outputName: 'vystup',
                    inputs:
                    [
                        {
                            id: 'sample-changes',
                            inputName: 'vstup'
                        }
                    ]
                }
            ],
            nodeMetadata:
            {
                coordinates: 
                {
                    x: 230,
                    y: 80
                },
                options: null
            }
        },
        {
            id: 'sample-changes',
            package: 'basic-components',
            name: 'sampleChange',
            relationsOptions: null,
            outputs:
            [
                {
                    outputName: 'vystup',
                    inputs:
                    [
                        {
                            id: 'relations-result',
                            inputName: 'vstup'
                        }
                    ]
                }
            ],
            nodeMetadata:
            {
                coordinates: 
                {
                    x: 430,
                    y: 100
                },
                options: null
            }
        },
        {
            id: 'relations-result',
            package: 'static-components',
            name: 'relations-result',
            relationsOptions: null,
            outputs: [],
            nodeMetadata:
            {
                coordinates: 
                {
                    x: 630,
                    y: 60
                },
                options: null
            }
        }
    ];
}