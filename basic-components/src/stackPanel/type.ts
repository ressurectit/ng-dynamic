import {ComponentStylingExtension} from '@anglr/dynamic/layout';

import {StackPanelFlexExtension} from './extensions';
import {StackPanelSAComponent} from './stackPanel.component';

export default StackPanelSAComponent;

export const childExtensions = [StackPanelFlexExtension];
export const extensions = [ComponentStylingExtension];