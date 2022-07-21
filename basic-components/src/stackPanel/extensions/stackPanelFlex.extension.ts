import {DynamicItemExtension, DynamicItemExtensionBase} from '@anglr/dynamic';
import {isPresent} from '@jscrpt/common';

import {StackPanelFlexExtensionOptions} from '../stackPanelExtensions.options';

/**
 * Child extension that applies flex styling to child
 */
export class StackPanelFlexExtension extends DynamicItemExtensionBase<StackPanelFlexExtensionOptions> implements DynamicItemExtension<StackPanelFlexExtensionOptions>
{
    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onInit(): void
    {
        this._applyStyling();
    }

    /**
     * @inheritdoc
     */
    protected override onOptionsChange(): void
    {
        this._applyStyling();
    }

    //######################### protected methods #########################

    /**
     * Applies flex styling to element
     */
    protected _applyStyling(): void
    {
        const options = this._options;

        if(isPresent(options?.flex))
        {
            const style = this._element?.nativeElement.style;

            if(style && this._options)
            {
                style.flex = this._options.flex ?? '';
            }
        }
    }
}