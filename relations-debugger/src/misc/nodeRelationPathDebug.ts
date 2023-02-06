import {NodeRelationPath} from '@anglr/dynamic/relations-editor';
import {Selection} from 'd3';

/**
 * Class that represents node relation path for debugging
 */
export class NodeRelationPathDebug extends NodeRelationPath
{
    //######################### protected properties #########################

    /**
     * Instance of overlay
     */
    protected overlay: Selection<SVGPathElement, {}, null, undefined>|undefined|null;

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override destroy(): void
    {
        super.destroy();

        this.destroyTransferOverlay();
    }

    //######################### public methods #########################

    /**
     * Creates transfer overlay preventing hover
     */
    public createTransferOverlay(): void
    {
        if(this.overlay)
        {
            return;
        }

        this.overlay = this.parentGroup.append('path')
            .attr('fill', 'transparent')
            .attr('stroke', 'transparent')
            .attr('stroke-width', '5px');
    }

    /**
     * Destroys transfer overlay preventing hover
     */
    public destroyTransferOverlay(): void
    {
        this.overlay?.remove();
        this.overlay = null;
    }

    /**
     * @inheritdoc
     */
    public override invalidateVisuals(propertyName?: string): void
    {
        super.invalidateVisuals(propertyName);

        if(this.path && this.overlay)
        {
            this.overlay.attr('d', this.path.attr('d'));
        }
    }
}