import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsManager, RelationsProcessor} from '@anglr/dynamic/relations';

/**
 * Page for displaying relations
 */
@Component(
{
    selector: 'relations-view',
    templateUrl: 'relations.component.html',
    // styleUrls: ['relations.component.scss'],
    providers:
    [
        RelationsManager,
        RelationsProcessor,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'relations'})
export class RelationsComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Indication whether is relations sample click component visible
     */
    protected visible: boolean = true;

    //######################### constructor #########################
    constructor(private _relationsManager: RelationsManager,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        setTimeout(() =>
        {
            this._relationsManager.setRelations(
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
                    ]
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
                    ]
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
                    ]
                },
                {
                    id: 'relations-result',
                    package: 'static-components',
                    name: 'relations-result',
                    relationsOptions: null,
                    outputs: []
                }
            ]);
        }, 5000);
    }
}