import {Injectable, Type} from '@angular/core';
import {applyDynamicHostDirective, LayoutComponent, LayoutRenderer, LayoutRendererItem} from '@anglr/dynamic/layout';

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
        applyDynamicHostDirective(type, []);
    }
}