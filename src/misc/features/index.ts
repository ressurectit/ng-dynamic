import {EditorHotkeys} from '../../services';
import {DynamicFeature} from './dynamic.feature';

/**
 * Enables use of editor hotkeys (keyboard shortcuts)
 */
export function withEditorHotkeys(): DynamicFeature
{
    return new DynamicFeature(
    {
        layoutEditor:
        {
            prependProviders: [],
            providers:
            [
                EditorHotkeys,
            ],
        },
        relationsEditor:
        {
            prependProviders: [],
            providers:
            [
                EditorHotkeys,
            ],
        }
    });
}
