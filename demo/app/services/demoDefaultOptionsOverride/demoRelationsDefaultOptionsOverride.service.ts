import {Injectable} from '@angular/core';
import {DefaultOptionsOverride} from '@anglr/dynamic';

@Injectable()
export class DemoRelationsDefaultOptionsOverrideService implements DefaultOptionsOverride
{
    public get(packageName: string, name: string, defaultOptions: any)
    {
        return defaultOptions;
    }
    
}