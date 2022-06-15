import {Injectable} from '@angular/core';

import {DynamicItemModule, DynamicItemType} from '../../metadata';
import {DynamicItemLoaderExtractor} from '../dynamicItemLoader/dynamicItemLoader.interface';

/**
 * Extracts dynamic item type which is module export
 */
@Injectable()
export class ModuleDynamicItemLoaderExtractor implements DynamicItemLoaderExtractor
{
    //######################### public methods - implementation of DynamicItemLoaderExtractor #########################

    /**
     * @inheritdoc
     */
    public tryToExtract(module: DynamicItemModule): DynamicItemType|null
    {
        console.log(module);

        return null;
    }
}