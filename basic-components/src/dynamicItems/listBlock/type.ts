import {ComponentStylingExtension} from '@anglr/dynamic/layout';
import {RelationsRegistrationExtension} from '@anglr/dynamic/relations';

import {ListBlockDataExtension} from './extensions';
import {ListBlockComponent} from './listBlock.component';

export default ListBlockComponent;

export const extensions = [ComponentStylingExtension, RelationsRegistrationExtension, ListBlockDataExtension];