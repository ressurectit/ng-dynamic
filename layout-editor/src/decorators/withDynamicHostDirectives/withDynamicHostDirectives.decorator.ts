import {ɵComponentDef, ɵComponentType, ɵɵHostDirectivesFeature} from '@angular/core';
import {globalDefine, isBlank} from '@jscrpt/common';

declare const ngDesignerMetadata: boolean;

globalDefine(global =>
{
    if(isBlank(global.ngDesignerMetadata))
    {
        global.ngDesignerMetadata = true;
    }
});

//TODO: move into common

/**
 * Allows use of dynamic host directives even without defining host directives on component/directive itself
 */
export function WithDynamicHostDirectives(): ClassDecorator
{
    return function <TFunction extends Function> (target: TFunction): TFunction
    {
        if(ngDesignerMetadata)
        {
            const componentDef = ((target as unknown as ɵComponentType<unknown>).ɵcmp as ɵComponentDef<unknown>);

            if(!componentDef.findHostDirectiveDefs)
            {
                const feature = ɵɵHostDirectivesFeature([]);
    
                componentDef.features?.unshift(feature);
                feature(componentDef);
            }

            return target;
        }

        return target;
    };
}