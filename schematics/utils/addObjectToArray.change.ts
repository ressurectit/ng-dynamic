import {Tree, SchematicsException} from '@angular-devkit/schematics';
import {Change, InsertChange} from '@schematics/angular/utility/change';
import {getSourceNodes} from '@schematics/angular/utility/ast-utils';
import * as ts from 'typescript';

export function addObjectToArrayChange(path: string, arrayName: string, object: unknown, tree: Tree): Change
{
    const text = tree.read(path);
    if (!text) 
    {
        throw new SchematicsException(`File ${path} does not exist.`);
    }

    const sourceText = text.toString('utf-8');
    // create the typescript source file
    const sourceFile = ts.createSourceFile(path, sourceText, ts.ScriptTarget.Latest, true);
    const nodes: ts.Node[] = getSourceNodes(sourceFile);
    const arrayNode = nodes.find(n => n.kind === ts.SyntaxKind.Identifier && n.getText() === arrayName);
 
    if (!arrayNode || !arrayNode.parent) {
        throw new SchematicsException(`expected ${arrayName} variable in ${path}`);
    }
 
    // define arrayNode's sibling nodes and remove arrayNode from it
    let arrayNodeSiblings = arrayNode.parent.getChildren();
    const arrayNodeIndex = arrayNodeSiblings.indexOf(arrayNode);
    arrayNodeSiblings = arrayNodeSiblings.slice(arrayNodeIndex);
 
    // get array literal experssion from the siblings, this means this sign "["
    const arrayNodeArrayLiteralExpressionNode = arrayNodeSiblings.find(n => n.kind === ts.SyntaxKind.ArrayLiteralExpression);
 
    if (!arrayNodeArrayLiteralExpressionNode) 
    {
        throw new SchematicsException(`${arrayName} ArrayLiteralExpression node is not defined`);
    }
 
    // get array list node which is in the children of peopleArrayLiteralExpressionNode and its kind of SyntaxList
    const arrayListNode = arrayNodeArrayLiteralExpressionNode.getChildren().find(n => n.kind === ts.SyntaxKind.SyntaxList);
 
    if (!arrayListNode) 
    {
        throw new SchematicsException(`${path} list node is not defined`);
    }
 
    // insert the new object to the end of the array
    return new InsertChange(path, arrayListNode.getEnd(), `${object}`);
}