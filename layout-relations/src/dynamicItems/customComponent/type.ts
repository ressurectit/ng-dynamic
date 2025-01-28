// import {RelationsRegistrationExtension} from '@anglr/dynamic/relations';
import {ComponentStylingExtension} from '@anglr/dynamic/layout';

import {IdSetterExtension} from '../../misc/extensions';
import {CustomComponentComponent} from './customComponent.component';
import {CustomComponentDataExtension} from './extensions';

export default CustomComponentComponent;

export const extensions = [ComponentStylingExtension, CustomComponentDataExtension, IdSetterExtension];