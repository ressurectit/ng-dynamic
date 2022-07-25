import {ComponentStylingOptions, LayoutComponentMetadata, TextFontWeight} from '@anglr/dynamic/layout';
import {ButtonComponentOptions, GridPanelCellComponentOptions, GridPanelComponentOptions, StackPanelComponentOptions, StackPanelFlexExtensionOptions, TextBlockComponentOptions} from '@anglr/dynamic/basic-components';
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';

/**
 * Class storing demo data
 */
export class DemoData
{
    public static demoRelationsComplexLayout: LayoutComponentMetadata =
    {
        id: 'stackPanel-gnunpdxjmo',
        displayName: 'root',
        package: 'basic-components',
        name: 'stackPanel',
        options: 
        {
            children: 
            [
                {
                    id: 'toggleButton-cxgzwxfbakimcwtt',
                    displayName: 'toggleButton-cxgzwxfbakimcwtt',
                    package: 'basic-components',
                    name: 'toggleButton',
                    options: 
                    {
                        onText: 'enabled',
                        offText: 'disabled',
                        state: true,
                        disabled: false
                    }
                },
                {
                    id: 'toggleButton-tebgqrkcwwjohouy',
                    displayName: 'toggleButton-tebgqrkcwwjohouy',
                    package: 'basic-components',
                    name: 'toggleButton',
                    options: 
                    {
                        onText: 'true',
                        offText: 'false',
                        state: true,
                        disabled: false,
                        margin: 
                        {
                            top: '100px',
                            right: null,
                            bottom: null,
                            left: '50px'
                        },
                        padding: 
                        {
                            top: null,
                            right: null,
                            bottom: null,
                            left: null
                        },
                        textStyling: null
                    }
                },
                {
                    id: 'ifBlock-itsfrxuwqkjwmfba',
                    displayName: 'ifBlock-itsfrxuwqkjwmfba',
                    package: 'basic-components',
                    name: 'ifBlock',
                    options: 
                    {
                        content: 
                        {
                            id: 'textBlock-uxqfhpaidkfrkkcn',
                            displayName: 'textBlock-uxqfhpaidkfrkkcn',
                            package: 'basic-components',
                            name: 'textBlock',
                            options: 
                            {
                                text: 'Text zavisly'
                            }
                        }
                    }
                }
            ]
        }
    };

    public static demoLayoutWithRelations: LayoutComponentMetadata =
    {
        id: 'stackPanel-vqvfofhvbr',
        displayName: 'root',
        package: 'basic-components',
        name: 'stackPanel',
        options: 
        {
            children: 
            [
                {
                    id: 'toggleButton-hdiibafzmmsbxwce',
                    displayName: 'toggleButton-hdiibafzmmsbxwce',
                    package: 'basic-components',
                    name: 'toggleButton',
                    options: 
                    {
                        onText: 'enabled',
                        offText: 'disabled',
                        state: true,
                        disabled: false
                    }
                },
                {
                    id: 'toggleButton-fdlsupcfigkcfkht',
                    displayName: 'button',
                    package: 'basic-components',
                    name: 'toggleButton',
                    options: 
                    {
                        onText: 'Visible',
                        offText: 'Hidden',
                        state: false,
                        disabled: false
                    }
                },
                {
                    id: 'ifBlock-mptoexcmmpziivra',
                    displayName: 'if block',
                    package: 'basic-components',
                    name: 'ifBlock',
                    options: 
                    {
                        content: 
                        {
                            id: 'stackPanel-rrnjftuftknhrect',
                            displayName: 'stackPanel-rrnjftuftknhrect',
                            package: 'basic-components',
                            name: 'stackPanel',
                            options: 
                            {
                                children: 
                                [
                                    {
                                        id: 'textBlock-rqatdtspmrxoiphw',
                                        displayName: 'textBlock-rqatdtspmrxoiphw',
                                        package: 'basic-components',
                                        name: 'textBlock',
                                        options: 
                                        {
                                            text: 'Druhý riadok'
                                        }
                                    },
                                    {
                                        id: 'textBlock-kogfkyqyjrbjmscb',
                                        displayName: 'textBlock-kogfkyqyjrbjmscb',
                                        package: 'basic-components',
                                        name: 'textBlock',
                                        options: 
                                        {
                                            text: 'Prvý riadok'
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    id: 'textBlock-cwbnbrdroqimxhor',
                    displayName: 'textBlock-cwbnbrdroqimxhor',
                    package: 'basic-components',
                    name: 'textBlock',
                    options: 
                    {
                        text: 'Tretí riadok - mimo'
                    }
                }
            ]
        }
    };

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

    public static demoRelationsComplexRelations: RelationsNodeMetadata[] =
    [
        {
            id: 'negation-sgxkzfxotghwaopl',
            name: 'negation',
            package: 'basic-components',
            displayName: 'negation-sgxkzfxotghwaopl',
            relationsOptions: {},
            nodeMetadata: 
            {
                coordinates: 
                {
                    x: 600,
                    y: 321
                },
                options: null
            },
            outputs: 
            [
                {
                    outputName: 'negatedCondition',
                    inputs: 
                    [
                        {
                            id: 'toggleButton-tebgqrkcwwjohouy',
                            inputName: 'disabled'
                        }
                    ]
                }
            ]
        },
        {
            id: 'static-input',
            name: 'static-input',
            package: 'static-components',
            displayName: 'static-input',
            relationsOptions: {},
            nodeMetadata: 
            {
                coordinates: 
                {
                    x: 166,
                    y: 257
                },
                options: null
            },
            outputs: 
            [
                {
                    outputName: 'stringOutput',
                    inputs: []
                },
                {
                    outputName: 'booleanOutput',
                    inputs: 
                    [
                        {
                            id: 'toggleButton-cxgzwxfbakimcwtt',
                            inputName: 'disabled'
                        }
                    ]
                }
            ]
        },
        {
            id: 'static-output',
            name: 'static-output',
            package: 'static-components',
            displayName: 'static-output',
            relationsOptions: {},
            nodeMetadata: 
            {
                coordinates: 
                {
                    x: 1278,
                    y: 255
                },
                options: null
            },
            outputs: []
        },
        {
            id: 'toggleButton-cxgzwxfbakimcwtt',
            name: 'toggleButton-cxgzwxfbakimcwtt',
            package: 'layout-components',
            displayName: 'toggleButton-cxgzwxfbakimcwtt',
            relationsOptions: {},
            nodeMetadata: 
            {
                coordinates: 
                {
                    x: 388,
                    y: 135
                },
                options: null
            },
            outputs: 
            [
                {
                    outputName: 'toggle',
                    inputs: 
                    [
                        {
                            id: 'negation-sgxkzfxotghwaopl',
                            inputName: 'condition'
                        }
                    ]
                }
            ]
        },
        {
            id: 'toggleButton-tebgqrkcwwjohouy',
            name: 'toggleButton-tebgqrkcwwjohouy',
            package: 'layout-components',
            displayName: 'toggleButton-tebgqrkcwwjohouy',
            relationsOptions: {},
            nodeMetadata: 
            {
                coordinates: 
                {
                    x: 836,
                    y: 131
                },
                options: null
            },
            outputs: 
            [
                {
                    outputName: 'toggle',
                    inputs: 
                    [
                        {
                            id: 'static-output',
                            inputName: 'booleanInput'
                        },
                        {
                            id: 'ifBlock-itsfrxuwqkjwmfba',
                            inputName: 'condition'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ifBlock-itsfrxuwqkjwmfba',
            name: 'ifBlock-itsfrxuwqkjwmfba',
            package: 'layout-components',
            displayName: 'ifBlock-itsfrxuwqkjwmfba',
            relationsOptions: {},
            nodeMetadata: 
            {
                coordinates: 
                {
                    x: 1246,
                    y: 94
                },
                options: null
            },
            outputs: []
        }
    ];

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
                    x: 30,
                    y: 60
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
                            id: 'sample-changes2',
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
                    y: 100
                },
                options: null
            }
        },
        {
            id: 'sample-changes2',
            package: 'basic-components',
            name: 'sampleChange',
            relationsOptions: null,
            outputs: [],
            nodeMetadata:
            {
                coordinates: 
                {
                    x: 430,
                    y: 40
                },
                options: null
            }
        },
    ];

    public static relationsStaticDemo: RelationsNodeMetadata[] =
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

    public static relationsWithLayoutDemo: RelationsNodeMetadata[] =
    [
        {
            id: 'toggleButton-fdlsupcfigkcfkht',
            name: 'toggleButton-fdlsupcfigkcfkht',
            package: 'layout-components',
            displayName: 'toggleButton-fdlsupcfigkcfkht',
            relationsOptions: {},
            nodeMetadata: 
            {
                coordinates: 
                {
                    x: 517,
                    y: 315
                },
                options: null
            },
            outputs: 
            [
                {
                    outputName: 'toggle',
                    inputs: 
                    [
                        {
                            id: 'ifBlock-mptoexcmmpziivra',
                            inputName: 'condition'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ifBlock-mptoexcmmpziivra',
            name: 'ifBlock-mptoexcmmpziivra',
            package: 'layout-components',
            displayName: 'ifBlock-mptoexcmmpziivra',
            relationsOptions: {},
            nodeMetadata:
            {
                coordinates: 
                {
                    x: 565,
                    y: 105
                },
                options: null
            },
            outputs: []
        },
        {
            id: 'toggleButton-hdiibafzmmsbxwce',
            name: 'toggleButton-hdiibafzmmsbxwce',
            package: 'layout-components',
            displayName: 'toggleButton-hdiibafzmmsbxwce',
            relationsOptions: {},
            nodeMetadata: 
            {
                coordinates: 
                {
                    x: 89,
                    y: 103
                },
                options: null
            },
            outputs: 
            [
                {
                    outputName: 'toggle',
                    inputs: 
                    [
                        {
                            id: 'negation-sgxkzfxotghwaopl',
                            inputName: 'condition'
                        }
                    ]
                }
            ]
        },
        {
            id: 'negation-sgxkzfxotghwaopl',
            name: 'negation',
            package: 'basic-components',
            displayName: 'negation-sgxkzfxotghwaopl',
            relationsOptions: {},
            nodeMetadata: 
            {
                coordinates: 
                {
                    x: 163,
                    y: 314
                },
                options: null
            },
            outputs: 
            [
                {
                    outputName: 'negatedCondition',
                    inputs: 
                    [
                        {
                            id: 'toggleButton-fdlsupcfigkcfkht',
                            inputName: 'disabled'
                        }
                    ]
                }
            ]
        }
    ];

    public static relationsStaticWithEditorDemo: RelationsNodeMetadata[] =
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