import {ElementRef, Injector} from '@angular/core';
import {DynamicItemExtension} from '@anglr/dynamic';

import {StackPanelSAComponent} from './stackPanel.component';
import {StackPanelComponentOptions} from './stackPanel.options';

export default StackPanelSAComponent;

class TestExtension implements DynamicItemExtension
{
    //######################### public methods - implementation of DynamicItemExtension #########################

    /**
     * @inheritdoc
     */
    public initialize(injector: Injector, element: ElementRef<HTMLElement>, options: StackPanelComponentOptions): void
    {
        console.log('initliazing text extension', element);
    }

    /**
     * @inheritdoc
     */
    public optionsChange(options: StackPanelComponentOptions): void
    {
        console.log('options change test extension');
    }

    /**
     * @inheritdoc
     */
    public destroy(): void
    {
        console.log('destroy test extension');
    }
}

export const childExtensions = [TestExtension];