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
                                        id: 'styleBlock-thjphwmhesuywokp',
                                        displayName: 'styleBlock-thjphwmhesuywokp',
                                        package: 'css-components',
                                        name: 'styleBlock',
                                        options: 
                                        {
                                            content: 
                                            {
                                                id: 'stackPanel-veydkvmijnamfvgo',
                                                displayName: 'stackPanel-veydkvmijnamfvgo',
                                                package: 'basic-components',
                                                name: 'stackPanel',
                                                options: 
                                                {
                                                    children: 
                                                    [
                                                        {
                                                            id: 'textBlock-recxnhpmozgxhrqe',
                                                            displayName: 'textBlock-recxnhpmozgxhrqe',
                                                            package: 'basic-components',
                                                            name: 'textBlock',
                                                            options: 
                                                            {
                                                                text: 'This is your text'
                                                            }
                                                        },
                                                        {
                                                            id: 'textBlock-lvxyyyfodftunril',
                                                            displayName: 'textBlock-lvxyyyfodftunril',
                                                            package: 'basic-components',
                                                            name: 'textBlock',
                                                            options: 
                                                            {
                                                                text: 'This is your text',
                                                                cssClass: 'text-danger',
                                                                margin: 
                                                                {
                                                                    top: null,
                                                                    right: null,
                                                                    bottom: null,
                                                                    left: null
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
                                                        }
                                                    ]
                                                }
                                            },
                                            style: 'text-block\r\n{\r\n    font-size: 1.2em;\r\n    font-weight: bold;\r\n}\r\n\r\n.text-danger\r\n{\r\n    color: red;\r\n}'
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
                            options: <Partial<StackPanelComponentOptions>>
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                            id: 'relations-result',
                            inputName: 'vstup'
                        }
                    ]
                }
            ],
            nodeMetadata:
            {
                scopeConfigurable: true,
                coordinates: 
                {
                    x: 230,
                    y: 80
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
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
                scopeConfigurable: true,
                coordinates: 
                {
                    x: 630,
                    y: 60
                },
                options: null
            }
        }
    ];

    public static complexDemoRestLayout: LayoutComponentMetadata =
    {
        id: 'stackPanel-lmzeehndic',
        displayName: 'root',
        package: 'basic-components',
        name: 'stackPanel',
        options: {
            children: [
                {
                    id: 'textBlock-qdmlirsbsocykwdt',
                    displayName: 'textBlock-qdmlirsbsocykwdt',
                    package: 'basic-components',
                    name: 'textBlock',
                    options: {
                        text: 'Write \'nice\' or \'default\' and see what happens'
                    }
                },
                {
                    id: 'ifBlock-tmwjofgfbijizdsd',
                    displayName: 'ifBlock-tmwjofgfbijizdsd',
                    package: 'basic-components',
                    name: 'ifBlock',
                    options: {
                        condition: true,
                        content: {
                            id: 'htmlBlock-fjcmywitfmggcczg',
                            displayName: 'result text',
                            package: 'basic-components',
                            name: 'htmlBlock',
                            options: {}
                        }
                    }
                },
                {
                    id: 'styleBlock-gjloaxmndqctbvur',
                    displayName: 'result text',
                    package: 'css-components',
                    name: 'styleBlock',
                    options: {
                        content: {
                            id: 'htmlBlock-lkgbjhhwxcprqazq',
                            displayName: 'error text',
                            package: 'basic-components',
                            name: 'htmlBlock',
                            options: {}
                        },
                        style: '*\r\n{\r\n    color: red;\r\n}'
                    }
                }
            ]
        }
    };

    public static complexDemoRestRelations: RelationsNodeMetadata[] =
    [
        {
            id: 'rest-gtxgzfdjdetcfxge',
            name: 'rest',
            package: 'basic-components',
            displayName: 'rest-gtxgzfdjdetcfxge',
            relationsOptions: {
                url: 'api/test/{id}.json',
                method: 'GET',
                runImmediately: true,
                params: [
                    {
                        configurable: true,
                        name: 'id',
                        type: 'PATH'
                    }
                ]
            },
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 237,
                    y: 19
                },
                options: null
            },
            outputs: [
                {
                    outputName: 'success',
                    inputs: [
                        {
                            id: 'dataTemplate-jyigbbscythtjvbl',
                            inputName: 'data'
                        },
                        {
                            id: 'ifBlock-tmwjofgfbijizdsd',
                            inputName: 'condition'
                        }
                    ]
                },
                {
                    outputName: 'error',
                    inputs: [
                        {
                            id: 'dataTemplate-ieotfcorviatqkio',
                            inputName: 'data'
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
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 37,
                    y: 275
                },
                options: null
            },
            outputs: [
                {
                    outputName: 'stringOutput',
                    inputs: [
                        {
                            id: 'rest-gtxgzfdjdetcfxge',
                            inputName: 'id'
                        }
                    ]
                },
                {
                    outputName: 'booleanOutput',
                    inputs: []
                }
            ]
        },
        {
            id: 'dataTemplate-jyigbbscythtjvbl',
            name: 'dataTemplate',
            package: 'handlebars-components',
            displayName: 'dataTemplate-jyigbbscythtjvbl',
            relationsOptions: {
                template: '{{message}}'
            },
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 551,
                    y: 404
                },
                options: null
            },
            outputs: [
                {
                    outputName: 'output',
                    inputs: [
                        {
                            id: 'htmlBlock-fjcmywitfmggcczg',
                            inputName: 'content'
                        }
                    ]
                }
            ]
        },
        {
            id: 'dataTemplate-ieotfcorviatqkio',
            name: 'dataTemplate',
            package: 'handlebars-components',
            displayName: 'dataTemplate-ieotfcorviatqkio',
            relationsOptions: {
                template: '{{message}}'
            },
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 557,
                    y: 574
                },
                options: null
            },
            outputs: [
                {
                    outputName: 'output',
                    inputs: [
                        {
                            id: 'htmlBlock-lkgbjhhwxcprqazq',
                            inputName: 'content'
                        }
                    ]
                }
            ]
        },
        {
            id: 'richTextSource-fylskmtjhddedbbp',
            name: 'richTextSource',
            package: 'tinymce-components',
            displayName: 'richTextSource-fylskmtjhddedbbp',
            relationsOptions: {
                content: '<ul>\n<li><strong>name</strong> <em>{{name}}</em></li>\n<li><strong>surname</strong> <em>{{surname}}</em></li>\n</ul>'
            },
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 11,
                    y: 419
                },
                options: null
            },
            outputs: [
                {
                    outputName: 'htmlString',
                    inputs: [
                        {
                            id: 'dataTemplate-jyigbbscythtjvbl',
                            inputName: 'template'
                        }
                    ]
                }
            ]
        },
        {
            id: 'htmlBlock-fjcmywitfmggcczg',
            name: 'htmlBlock-fjcmywitfmggcczg',
            package: 'layout-components',
            displayName: 'htmlBlock-fjcmywitfmggcczg',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 903,
                    y: 210
                },
                options: null
            },
            outputs: []
        },
        {
            id: 'htmlBlock-lkgbjhhwxcprqazq',
            name: 'htmlBlock-lkgbjhhwxcprqazq',
            package: 'layout-components',
            displayName: 'htmlBlock-lkgbjhhwxcprqazq',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 911,
                    y: 346
                },
                options: null
            },
            outputs: []
        },
        {
            id: 'ifBlock-tmwjofgfbijizdsd',
            name: 'ifBlock-tmwjofgfbijizdsd',
            package: 'layout-components',
            displayName: 'ifBlock-tmwjofgfbijizdsd',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 907,
                    y: 91
                },
                options: null
            },
            outputs: []
        }
    ];

    public static complexDemoFullLayout: LayoutComponentMetadata =
    {
        id: 'stackPanel-beygjadhnr',
        displayName: 'root',
        package: 'basic-components',
        name: 'stackPanel',
        options: {
            children: [
                {
                    id: 'richTextBlock-wrqwuruxkuozuxrp',
                    displayName: 'richTextBlock-wrqwuruxkuozuxrp',
                    package: 'tinymce-components',
                    name: 'richTextBlock',
                    options: {
                        content: '<p>This is nice <strong>Rich Text Block</strong> with <em>static</em> content<br>you can use:</p>\n<ul>\n<li><span style=\'color: rgb(22, 145, 121);\'>text styling</span></li>\n<li><span style=\'color: rgb(22, 145, 121);\'>multiline text</span></li>\n<li><span style=\'color: rgb(22, 145, 121);\'>and many other stuff</span></li>\n</ul>'
                    }
                },
                {
                    id: 'styleBlock-nylkqvvggqgelzpt',
                    displayName: 'styleBlock-nylkqvvggqgelzpt',
                    package: 'css-components',
                    name: 'styleBlock',
                    options: {
                        content: {
                            id: 'stackPanel-pasdjtmntxxhbtif',
                            displayName: 'stackPanel-pasdjtmntxxhbtif',
                            package: 'basic-components',
                            name: 'stackPanel',
                            options: {
                                children: [
                                    {
                                        id: 'richTextBlock-wayojkvcdzfxhgzw',
                                        displayName: 'richTextBlock-wayojkvcdzfxhgzw',
                                        package: 'tinymce-components',
                                        name: 'richTextBlock',
                                        options: {
                                            content: '<p>This is nice <strong>Rich Text Block</strong> with <em>static</em> content used inside of <em><strong>style block</strong></em><br>you can use:</p>\n<ul>\n<li><span style=\'color: rgb(22, 145, 121);\'>text styling</span></li>\n<li><span style=\'color: rgb(22, 145, 121);\'>multiline text</span></li>\n<li><span style=\'color: rgb(22, 145, 121);\'>and many other stuff</span></li>\n</ul>'
                                        }
                                    },
                                    {
                                        id: 'textBlock-qhdyjknpcjqwacot',
                                        displayName: 'textBlock-qhdyjknpcjqwacot',
                                        package: 'basic-components',
                                        name: 'textBlock',
                                        options: {
                                            text: 'Simple text block within style block'
                                        }
                                    },
                                    {
                                        id: 'textBlock-xkrqqhjijejhnsbk',
                                        displayName: 'textBlock-xkrqqhjijejhnsbk',
                                        package: 'basic-components',
                                        name: 'textBlock',
                                        options: {
                                            text: 'Simple text block with css class text-red within style block',
                                            cssClass: 'text-red',
                                            margin: {
                                                top: null,
                                                right: null,
                                                bottom: null,
                                                left: null
                                            },
                                            padding: {
                                                top: null,
                                                right: null,
                                                bottom: null,
                                                left: null
                                            },
                                            textStyling: null
                                        }
                                    }
                                ]
                            }
                        },
                        style: 'rich-text-block\r\n{\r\n    font-size: 1.4em;\r\n}\r\n\r\ntext-block\r\n{\r\n    font-size: 1.2em;\r\n}\r\n\r\n.text-red\r\n{\r\n    color: red;\r\n}'
                    }
                },
                {
                    id: 'textBlock-ddrupvsdqlvupdix',
                    displayName: 'textBlock-ddrupvsdqlvupdix',
                    package: 'basic-components',
                    name: 'textBlock',
                    options: {
                        text: 'Simple text block'
                    }
                },
                {
                    id: 'textBlock-ipaqxlwdcymfkwod',
                    displayName: 'textBlock-ipaqxlwdcymfkwod',
                    package: 'basic-components',
                    name: 'textBlock',
                    options: {
                        text: 'Simple text block with css class text-red',
                        cssClass: 'text-red',
                        margin: {
                            top: null,
                            right: null,
                            bottom: null,
                            left: null
                        },
                        padding: {
                            top: null,
                            right: null,
                            bottom: null,
                            left: null
                        },
                        textStyling: null
                    }
                },
                {
                    id: 'stackPanel-txrjlfxozbodmxcb',
                    displayName: 'stackPanel-txrjlfxozbodmxcb',
                    package: 'basic-components',
                    name: 'stackPanel',
                    options: {
                        children: [
                            {
                                id: 'toggleButton-mcthrpzgxzjsyfry',
                                displayName: 'toggleButton-mcthrpzgxzjsyfry',
                                package: 'basic-components',
                                name: 'toggleButton',
                                options: {
                                    onText: 'hide (true)',
                                    offText: 'show (false)',
                                    state: true,
                                    disabled: false
                                }
                            },
                            {
                                id: 'toggleButton-uiexplfcokfepzla',
                                displayName: 'toggleButton-uiexplfcokfepzla',
                                package: 'basic-components',
                                name: 'toggleButton',
                                options: {
                                    onText: 'show with negation (true)',
                                    offText: 'hide with negation (false)',
                                    state: true,
                                    disabled: false,
                                    cssClass: null,
                                    margin: {
                                        top: null,
                                        right: null,
                                        bottom: null,
                                        left: '10px'
                                    },
                                    padding: {
                                        top: null,
                                        right: null,
                                        bottom: null,
                                        left: null
                                    },
                                    textStyling: null
                                }
                            }
                        ],
                        horizontal: true,
                        wrap: false,
                        cssClass: null,
                        margin: {
                            top: '20px',
                            right: null,
                            bottom: '10px',
                            left: null
                        },
                        padding: {
                            top: null,
                            right: null,
                            bottom: null,
                            left: null
                        },
                        textStyling: null
                    }
                },
                {
                    id: 'ifBlock-npjsceeegdggbobt',
                    displayName: 'ifBlock-npjsceeegdggbobt',
                    package: 'basic-components',
                    name: 'ifBlock',
                    options: {
                        condition: true,
                        content: {
                            id: 'stackPanel-tkhpegqxzrnhcguy',
                            displayName: 'stackPanel-tkhpegqxzrnhcguy',
                            package: 'basic-components',
                            name: 'stackPanel',
                            options: {
                                children: [
                                    {
                                        id: 'textBlock-yjmagkldyrobwnik',
                                        displayName: 'textBlock-yjmagkldyrobwnik',
                                        package: 'basic-components',
                                        name: 'textBlock',
                                        options: {
                                            text: 'Write something into input on left and you will see it here:'
                                        }
                                    },
                                    {
                                        id: 'htmlBlock-dcpbevwptjcapuuo',
                                        displayName: 'htmlBlock-dcpbevwptjcapuuo',
                                        package: 'basic-components',
                                        name: 'htmlBlock',
                                        options: {
                                            content: 'text from input'
                                        }
                                    },
                                    {
                                        id: 'htmlBlock-zechbkcvoryocjsw',
                                        displayName: 'htmlBlock-zechbkcvoryocjsw',
                                        package: 'basic-components',
                                        name: 'htmlBlock',
                                        options: {
                                            content: 'text from input with transform'
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    id: 'stackPanel-ngdupdsphwbvqyuc',
                    displayName: 'stackPanel-ngdupdsphwbvqyuc',
                    package: 'basic-components',
                    name: 'stackPanel',
                    options: {
                        horizontal: true,
                        wrap: false,
                        children: [
                            {
                                id: 'textBlock-gyggvjnhplpvubzx',
                                displayName: 'textBlock-gyggvjnhplpvubzx',
                                package: 'basic-components',
                                name: 'textBlock',
                                options: {
                                    text: 'value of first button:',
                                    cssClass: 'bold',
                                    margin: {
                                        top: null,
                                        right: '10px',
                                        bottom: null,
                                        left: null
                                    },
                                    padding: {
                                        top: null,
                                        right: null,
                                        bottom: null,
                                        left: null
                                    },
                                    textStyling: null
                                }
                            },
                            {
                                id: 'htmlBlock-hcmxzixcqvdvmhro',
                                displayName: 'htmlBlock-hcmxzixcqvdvmhro',
                                package: 'basic-components',
                                name: 'htmlBlock',
                                options: {
                                    content: 'true or false'
                                }
                            }
                        ]
                    }
                },
                {
                    id: 'stackPanel-ebgnhczhycabvtvm',
                    displayName: 'stackPanel-ebgnhczhycabvtvm',
                    package: 'basic-components',
                    name: 'stackPanel',
                    options: {
                        horizontal: true,
                        wrap: false,
                        children: [
                            {
                                id: 'textBlock-raujpwlmgoquneph',
                                displayName: 'textBlock-raujpwlmgoquneph',
                                package: 'basic-components',
                                name: 'textBlock',
                                options: {
                                    text: 'value of first button with negation:',
                                    cssClass: 'bold',
                                    margin: {
                                        top: null,
                                        right: '10px',
                                        bottom: null,
                                        left: null
                                    },
                                    padding: {
                                        top: null,
                                        right: null,
                                        bottom: null,
                                        left: null
                                    },
                                    textStyling: null
                                }
                            },
                            {
                                id: 'htmlBlock-wrbokioxmurhwpfb',
                                displayName: 'htmlBlock-wrbokioxmurhwpfb',
                                package: 'basic-components',
                                name: 'htmlBlock',
                                options: {
                                    content: 'true or false'
                                }
                            }
                        ]
                    }
                },
                {
                    id: 'textBlock-ursfvilgwmyoepof',
                    displayName: 'textBlock-ursfvilgwmyoepof',
                    package: 'basic-components',
                    name: 'textBlock',
                    options: {
                        text: 'Data block sample:',
                        cssClass: 'bold',
                        margin: {
                            top: '16px',
                            right: null,
                            bottom: null,
                            left: null
                        },
                        padding: {
                            top: null,
                            right: null,
                            bottom: null,
                            left: null
                        },
                        textStyling: null
                    }
                },
                {
                    id: 'dataBlock-ehdywmgygqqixqtw',
                    displayName: 'dataBlock-ehdywmgygqqixqtw',
                    package: 'handlebars-components',
                    name: 'dataBlock',
                    options: {
                        template: '<div>static data</div>\r\n<div>name:{{name}}</div>\r\n<div>surname:{{surname}}</div>'
                    }
                },
                {
                    id: 'textBlock-huuewtxeekrxignt',
                    displayName: 'textBlock-huuewtxeekrxignt',
                    package: 'basic-components',
                    name: 'textBlock',
                    options: {
                        text: 'wysiwyg with data:',
                        cssClass: 'bold',
                        margin: {
                            top: '16px',
                            right: null,
                            bottom: null,
                            left: null
                        },
                        padding: {
                            top: null,
                            right: null,
                            bottom: null,
                            left: null
                        },
                        textStyling: null
                    }
                },
                {
                    id: 'htmlBlock-ggpvvtgijxhbcohp',
                    displayName: 'htmlBlock-ggpvvtgijxhbcohp',
                    package: 'basic-components',
                    name: 'htmlBlock',
                    options: {
                        content: 'here will be wysiwyg data'
                    }
                }
            ]
        }
    };

    public static complexDemoFullRelations: RelationsNodeMetadata[] =
    [
        {
            id: 'negation-qvbqandognyjqdmy',
            name: 'negation',
            package: 'basic-components',
            displayName: 'negation-qvbqandognyjqdmy',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 841,
                    y: 194
                },
                options: null
            },
            outputs: [
                {
                    outputName: 'negatedCondition',
                    inputs: [
                        {
                            id: 'htmlBlock-wrbokioxmurhwpfb',
                            inputName: 'content'
                        },
                        {
                            id: 'static-output',
                            inputName: 'booleanInput'
                        }
                    ]
                }
            ]
        },
        {
            id: 'sampleSource-fkyadmjjmcpqkrwr',
            name: 'sampleSource',
            package: 'basic-components',
            displayName: 'sampleSource-fkyadmjjmcpqkrwr',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 34,
                    y: 291
                },
                options: null
            },
            outputs: [
                {
                    outputName: 'vystup',
                    inputs: []
                },
                {
                    outputName: 'obj',
                    inputs: [
                        {
                            id: 'dataBlock-ehdywmgygqqixqtw',
                            inputName: 'data'
                        },
                        {
                            id: 'dataTemplate-epbrdoqwxwiidpth',
                            inputName: 'data'
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
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 37,
                    y: 22
                },
                options: null
            },
            outputs: [
                {
                    outputName: 'stringOutput',
                    inputs: [
                        {
                            id: 'htmlBlock-dcpbevwptjcapuuo',
                            inputName: 'content'
                        },
                        {
                            id: 'sampleChange-vdepgebvmexpjbgs',
                            inputName: 'vstup'
                        }
                    ]
                },
                {
                    outputName: 'booleanOutput',
                    inputs: [
                        {
                            id: 'toggleButton-mcthrpzgxzjsyfry',
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
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 1257.4117647058822,
                    y: 254.41176470588235
                },
                options: null
            },
            outputs: []
        },
        {
            id: 'dataTemplate-epbrdoqwxwiidpth',
            name: 'dataTemplate',
            package: 'handlebars-components',
            displayName: 'dataTemplate-epbrdoqwxwiidpth',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 453,
                    y: 470
                },
                options: null
            },
            outputs: [
                {
                    outputName: 'output',
                    inputs: [
                        {
                            id: 'htmlBlock-ggpvvtgijxhbcohp',
                            inputName: 'content'
                        }
                    ]
                }
            ]
        },
        {
            id: 'richTextSource-iitweunljwassylo',
            name: 'richTextSource',
            package: 'tinymce-components',
            displayName: 'richTextSource-iitweunljwassylo',
            relationsOptions: {
                content: '<ul>\n<li>name: <strong>{{name}}</strong></li>\n<li>surname: <strong>{{surname}}</strong></li>\n<li>man: <strong>{{man}}</strong></li>\n<li>address: <em>{{address.city}}</em></li>\n</ul>'
            },
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 53,
                    y: 513
                },
                options: null
            },
            outputs: [
                {
                    outputName: 'htmlString',
                    inputs: [
                        {
                            id: 'dataTemplate-epbrdoqwxwiidpth',
                            inputName: 'template'
                        }
                    ]
                }
            ]
        },
        {
            id: 'toggleButton-mcthrpzgxzjsyfry',
            name: 'toggleButton-mcthrpzgxzjsyfry',
            package: 'layout-components',
            displayName: 'toggleButton-mcthrpzgxzjsyfry',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 432,
                    y: 27
                },
                options: null
            },
            outputs: [
                {
                    outputName: 'toggle',
                    inputs: [
                        {
                            id: 'htmlBlock-hcmxzixcqvdvmhro',
                            inputName: 'content'
                        },
                        {
                            id: 'ifBlock-npjsceeegdggbobt',
                            inputName: 'condition'
                        }
                    ]
                }
            ]
        },
        {
            id: 'htmlBlock-hcmxzixcqvdvmhro',
            name: 'htmlBlock-hcmxzixcqvdvmhro',
            package: 'layout-components',
            displayName: 'htmlBlock-hcmxzixcqvdvmhro',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 1172,
                    y: 21
                },
                options: null
            },
            outputs: []
        },
        {
            id: 'htmlBlock-wrbokioxmurhwpfb',
            name: 'htmlBlock-wrbokioxmurhwpfb',
            package: 'layout-components',
            displayName: 'htmlBlock-wrbokioxmurhwpfb',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 1254,
                    y: 152
                },
                options: null
            },
            outputs: []
        },
        {
            id: 'toggleButton-uiexplfcokfepzla',
            name: 'toggleButton-uiexplfcokfepzla',
            package: 'layout-components',
            displayName: 'toggleButton-uiexplfcokfepzla',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 431,
                    y: 147
                },
                options: null
            },
            outputs: [
                {
                    outputName: 'toggle',
                    inputs: [
                        {
                            id: 'negation-qvbqandognyjqdmy',
                            inputName: 'condition'
                        }
                    ]
                }
            ]
        },
        {
            id: 'htmlBlock-dcpbevwptjcapuuo',
            name: 'htmlBlock-dcpbevwptjcapuuo',
            package: 'layout-components',
            displayName: 'htmlBlock-dcpbevwptjcapuuo',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 55,
                    y: 189
                },
                options: null
            },
            outputs: []
        },
        {
            id: 'ifBlock-npjsceeegdggbobt',
            name: 'ifBlock-npjsceeegdggbobt',
            package: 'layout-components',
            displayName: 'ifBlock-npjsceeegdggbobt',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 842,
                    y: 323
                },
                options: null
            },
            outputs: []
        },
        {
            id: 'dataBlock-ehdywmgygqqixqtw',
            name: 'dataBlock-ehdywmgygqqixqtw',
            package: 'layout-components',
            displayName: 'dataBlock-ehdywmgygqqixqtw',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 433,
                    y: 325
                },
                options: null
            },
            outputs: []
        },
        {
            id: 'htmlBlock-ggpvvtgijxhbcohp',
            name: 'htmlBlock-ggpvvtgijxhbcohp',
            package: 'layout-components',
            displayName: 'htmlBlock-ggpvvtgijxhbcohp',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 964,
                    y: 471
                },
                options: null
            },
            outputs: []
        },
        {
            id: 'htmlBlock-zechbkcvoryocjsw',
            name: 'htmlBlock-zechbkcvoryocjsw',
            package: 'layout-components',
            displayName: 'htmlBlock-zechbkcvoryocjsw',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 605,
                    y: 616
                },
                options: null
            },
            outputs: []
        },
        {
            id: 'sampleChange-vdepgebvmexpjbgs',
            name: 'sampleChange',
            package: 'basic-components',
            displayName: 'sampleChange-vdepgebvmexpjbgs',
            relationsOptions: {},
            nodeMetadata: {
                scopeConfigurable: true,
                coordinates: {
                    x: 286,
                    y: 634
                },
                options: null
            },
            outputs: [
                {
                    outputName: 'vystup',
                    inputs: [
                        {
                            id: 'htmlBlock-zechbkcvoryocjsw',
                            inputName: 'content'
                        }
                    ]
                }
            ]
        }
    ];
}