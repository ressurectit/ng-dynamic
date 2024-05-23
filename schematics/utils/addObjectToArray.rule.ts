import {Tree, Rule} from '@angular-devkit/schematics';
import {InsertChange} from '@schematics/angular/utility/change';

import {addObjectToArrayChange} from './addObjectToArray.change';

export function addObjectToArrayRule(path: string, arrayName: string, object: unknown): Rule 
{
    return (tree: Tree) => 
    {
        const change = addObjectToArrayChange(path, arrayName, object, tree);
 
        const declarationRecorder = tree.beginUpdate(path);
        if (change instanceof InsertChange) 
        {
            declarationRecorder.insertLeft(change.pos,change.toAdd);
        }
        tree.commitUpdate(declarationRecorder); // commits the update on the tree
 
        return tree;
    };
}