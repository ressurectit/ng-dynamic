import {Injectable} from '@angular/core';
import {DefaultsOverride} from '@anglr/dynamic';

@Injectable()
export class DemoRelationsDefaultsOverrideService implements DefaultsOverride
{
    /**
     * @inheritdoc
     */
    public getOptions(packageName: string, name: string, defaultOptions: any)
    {
        return defaultOptions;
    }

    /**
     * @inheritdoc
     */
    public getDisplayName(packageName: string, name: string, displayName?: string): string 
    {
        switch (packageName)
        {
            case 'custom-components':
                switch (name)
                {
                    case 'componentInputs':
                        return 'custom input display name';
                }
                break;
        }

        return null;
    }    
}