import {Injectable} from '@angular/core';
import {DefaultOptionsOverride} from '@anglr/dynamic';
import {ButtonComponentOptions} from '@anglr/dynamic/basic-components';
import {extend} from '@jscrpt/common';

@Injectable()
export class DemoLayoutDefaultOptionsOverrideService implements DefaultOptionsOverride
{
    public get(packageName: string, name: string, defaultOptions: any)
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
    
}