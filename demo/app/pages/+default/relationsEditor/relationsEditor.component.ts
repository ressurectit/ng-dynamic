import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {DynamicItemLoader} from '@anglr/dynamic';
import {ComponentStylingOptions, LayoutComponentMetadata, LayoutManager, TextFontWeight} from '@anglr/dynamic/layout';
import {LayoutComponentsIteratorService} from '@anglr/dynamic/layout-editor';
import {RelationsModuleTypes, RelationsNodeDef, RELATIONS_MODULE_TYPES_LOADER, RELATIONS_NODES_LOADER} from '@anglr/dynamic/relations-editor';
import {ButtonComponentOptions, GridPanelCellComponentOptions, GridPanelComponentOptions, StackPanelComponentOptions, StackPanelFlexExtensionOptions, TextBlockComponentOptions} from '@anglr/dynamic/basic-components';

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
    public meta: LayoutComponentMetadata = 
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

    constructor(private _iteratorsSvc: LayoutComponentsIteratorService,
                private _manager: LayoutManager,
                @Inject(RELATIONS_MODULE_TYPES_LOADER) relationsTypesLoader: DynamicItemLoader<RelationsModuleTypes>,
                @Inject(RELATIONS_NODES_LOADER) nodesLoader: DynamicItemLoader<RelationsNodeDef>,)
    {
        this._manager.setRelations(this.meta);

        relationsTypesLoader.loadItem({package: 'basic-components', name: '---'}).then(res => console.log('res basic', res));
        relationsTypesLoader.loadItem({package: 'static-components', name: '---'}).then(res => console.log('res static', res));
        relationsTypesLoader.loadItem({package: 'layout-components', name: '---'}).then(res => console.log('res layout', res));

        nodesLoader.loadItem({package: 'layout-components', name: 'button-test'}).then(res => console.log('button', res));
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        const iterator = this._iteratorsSvc.getIteratorFor(this.meta);

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
