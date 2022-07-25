import {PromiseOr} from '@jscrpt/common';

/**
 * Class that represents abstract metadata storage
 */
export abstract class MetadataStorage
{
    /**
     * Saves current metadata into storage
     */
    public save(): PromiseOr<void>
    {
    }
}