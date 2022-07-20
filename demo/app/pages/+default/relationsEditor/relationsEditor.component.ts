import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {ComponentStylingOptions, TextFontWeight} from '@anglr/dynamic/layout';
import {LayoutComponentsIteratorService} from '@anglr/dynamic/layout-editor';
import {GridPanelCellComponentOptions, GridPanelComponentOptions, StackPanelComponentOptions, StackPanelFlexExtensionOptions, TextBlockComponentOptions} from '@anglr/dynamic/basic-components';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'relations-editor-view',
    templateUrl: 'relationsEditor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'relations-editor'})
export class RelationsEditorComponent
{
    constructor(private _iteratorsSvc: LayoutComponentsIteratorService)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        const iterator = this._iteratorsSvc.getIteratorFor(
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
        });

        // await iterator.forEach((itm, parent, index, level) =>
        // {
        //     console.log('iterate', itm, parent, index, level);
        // });

        for await (const metadata of iterator)
        {
            console.log('for...of', metadata);
        }
    }
}
