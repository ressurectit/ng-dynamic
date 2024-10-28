import {ComponentRef, Injectable, Type} from '@angular/core';
import {applyDynamicHostDirective, LayoutComponent, LayoutComponentMetadata, LayoutRenderer, LayoutRendererItem} from '@anglr/dynamic/layout';
import {PromiseOr} from '@jscrpt/common';

import {LayoutDesignerDirective} from '../../directives';

/**
 * Service used for handling rendering of layout for designer
 */
@Injectable()
export class LayoutEditorRenderer extends LayoutRenderer
{
    //######################### public methods #########################

    /**
     * Gets renderer information for component
     * @param id - Id of component that should be obtained
     */
    public get(id: string): LayoutRendererItem|undefined|null
    {
        return this.components[id];
    }

    //######################### protected overrides #########################

    /**
     * @inheritdoc
     */
    protected override updateTypeBeforeRender(type: Type<LayoutComponent>): void
    {
        applyDynamicHostDirective(type, [LayoutDesignerDirective]);
    }

    /**
     * @inheritdoc
     */
    protected override postProcessCreatedComponent(component: ComponentRef<LayoutComponent>, metadata: LayoutComponentMetadata): PromiseOr<void>
    {
        const designer = component.injector.get(LayoutDesignerDirective, null, {optional: true});

        if(!designer)
        {
            throw new Error('LayoutEditorRenderer: missing designer directive!');
        }

        designer.initializeDesigner(component, metadata);
    }
}