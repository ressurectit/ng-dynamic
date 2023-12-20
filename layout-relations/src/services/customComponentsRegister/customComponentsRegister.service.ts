import {Injectable} from '@angular/core';
import {CustomDynamiItemsRegister} from '@anglr/dynamic';

import {CustomComponentConfiguration} from './customComponentsRegister.interface';

/**
 * Register that contains registered custom components
 */
@Injectable()
export class CustomComponentsRegister<TConfig extends CustomComponentConfiguration = CustomComponentConfiguration> extends CustomDynamiItemsRegister<TConfig>
{
}
