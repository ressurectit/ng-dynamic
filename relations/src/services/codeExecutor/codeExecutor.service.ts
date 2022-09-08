import {Injectable, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {generateId, Dictionary} from '@jscrpt/common';

/**
 * Class used for executing javascript code and obtaining types from executed javascript code
 */
@Injectable()
export class CodeExecutor
{
    //######################### protected fields #########################

    /**
     * Loaded data cache for relations id
     */
    protected loadedDataCache: Dictionary<any> = {};

    //######################### constructor #########################
    constructor(@Inject(DOCUMENT) protected document: Document)
    {
    }

    //######################### public methods #########################

    /**
     * Loads data from dynamicaly executed code
     * @param relationsId - Id of relations for which is data loaded from code
     * @param code - Code used for obtaining data
     */
    public async loadData<TResult>(relationsId: string, code: string): Promise<TResult|null>
    {
        if(this.loadedDataCache[relationsId])
        {
            return this.loadedDataCache[relationsId];
        }

        const scriptElement = this.document.createElement('script');
        const loadHelper = `loadType${generateId(12)}`;
        let result: TResult|null = null;

        scriptElement.innerText = `
        (function(exports, loadType, require)
        {
            ${code}

            loadType(exports);
        })({}, ${loadHelper}.loadType, ${loadHelper}.require);`;

        (window as any)[loadHelper] =
        {
            loadType: (exp: {default: any}) => result = exp.default ?? null,
            require: (requireName: string) =>
            {
                console.log(requireName);

                return null;
            }
        };

        this.document.getElementsByTagName('head')[0].appendChild(scriptElement);
        delete (window as any)[loadHelper];
        scriptElement.remove();

        this.loadedDataCache[relationsId] = result;

        return result;
    }
}