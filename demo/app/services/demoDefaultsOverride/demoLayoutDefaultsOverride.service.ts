import {Injectable} from '@angular/core';
import {DefaultsOverride} from '@anglr/dynamic';
import {ButtonComponentOptions} from '@anglr/dynamic/basic-components';
import {extend} from '@jscrpt/common';

@Injectable()
export class DemoLayoutDefaultsOverrideService implements DefaultsOverride
{
    /**
     * @inheritdoc
     */
    public getOptions(packageName: string, name: string, defaultOptions: any)
    {
        switch (packageName)
        {
            case 'basic-components':
                switch (name)
                {
                    case 'button':
                        return extend(true, {}, defaultOptions, <ButtonComponentOptions>{
                            buttonCssClass: 'btn btn-info'
                        });
                }
                break;
        }

        return defaultOptions;
    }

    /**
     * @inheritdoc
     */
    public getDisplayName(packageName: string, name: string, displayName?: string): string 
    {
        return displayName;
    }        
}