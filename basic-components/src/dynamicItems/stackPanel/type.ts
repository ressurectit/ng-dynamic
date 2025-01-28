import {ComponentStylingExtension} from '@anglr/dynamic/layout';

import {StackPanelFlexExtension} from './extensions';
import {StackPanelComponent} from './stackPanel.component';

export default StackPanelComponent;

export const childExtensions = [StackPanelFlexExtension];
export const extensions = [ComponentStylingExtension];