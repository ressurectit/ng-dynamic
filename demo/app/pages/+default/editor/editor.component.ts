import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ComponentRoute} from '@anglr/common/router';
import {ComponentStylingOptions, LayoutComponentMetadata, TextFontWeight} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataManager, LAYOUT_DESIGNER_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout-editor';
import {ButtonComponentOptions, GridPanelCellComponentOptions, GridPanelComponentOptions, StackPanelComponentOptions, StackPanelFlexExtensionOptions, TextBlockComponentOptions} from '@anglr/dynamic/basic-components';
import {generateId} from '@jscrpt/common';

import {LayoutDataService} from '../../../services/layoutData';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'layout-editor-view',
    templateUrl: 'editor.component.html',
    providers:
    [
        LAYOUT_DESIGNER_COMPONENT_TRANSFORM,
        LayoutEditorMetadataManager,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'editor'})
@ComponentRoute({path: 'editor/:id'})
export class EditorComponent implements OnInit, OnDestroy
{
    //######################### protected properties - template bindings #########################

    protected _metadata: LayoutComponentMetadata|null = null;
    
    protected _available: FormControl = new FormControl('');

    protected _name: FormControl = new FormControl(null);

    protected _availableNames: string[] = [];

    //######################### constructor #########################
    constructor(private _manager: LayoutEditorMetadataManager,
                private _store: LayoutDataService,
                private _router: Router,
                private _route: ActivatedRoute,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._availableNames = this._store.getStoredLayouts();
        
        this._route.params.subscribe(({id}) =>
        {
            if(!id)
            {
                this._metadata =
                {
                    id: `stackPanel-${generateId(10)}`,
                    package: 'basic-components',
                    name: 'stackPanel',
                    options: <StackPanelComponentOptions>
                    {
                        children: [],
                    },
                };

                this._name.setValue('');
                this._available.setValue('');
            }
            else
            {
                this._name.setValue(id);
                this._available.setValue(id);
                this._metadata = this._store.getLayoutData(this._available.value);
            }
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
    }

    //######################### protected methods - template bindings #########################

    protected _load(): void
    {
        this._metadata = this._store.getLayoutData(this._available.value);
        this._name.setValue(this._available.value);

        this._router.navigate(['/editor', this._available.value], {skipLocationChange: false, replaceUrl: true});
    }

    protected _save(): void
    {
        this._store.setLayoutData(this._name.value, this._manager.getMetadata());

        this._availableNames = this._store.getStoredLayouts();
        this._router.navigate(['/editor', this._name.value], {skipLocationChange: false, replaceUrl: true});
    }

    protected _delete(): void
    {
        this._store.removeLayoutData(this._available.value);

        this._availableNames = this._store.getStoredLayouts();
        this._router.navigate(['/editor'], {skipLocationChange: false, replaceUrl: true});
    }

    protected _new(): void
    {
        this._metadata =
        {
            id: `stackPanel-${generateId(10)}`,
            package: 'basic-components',
            name: 'stackPanel',
            options: <StackPanelComponentOptions>
            {
                children: [],
            },
        };

        this._name.setValue('');
        this._available.setValue('');
        
        this._router.navigate(['/editor'], {skipLocationChange: false, replaceUrl: true});
    }

    protected _loadDemo(): void
    {
        this._metadata = {
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
    }

    // /**
    //  * Gets metadata for current metadata manager
    //  */
    // protected getMetadata(): void
    // {
        
    //     console.log(this._manager.root);
    //     console.log(this._manager.flatTree);
    //     console.log(this._manager.flatTree.map(itm => itm.component.options.typeMetadata.id));
    // }
}
