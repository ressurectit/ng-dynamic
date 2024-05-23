import {getProjectFromWorkspace} from '@angular/cdk/schematics';
import {Rule, apply, url, applyTemplates, chain, mergeWith, move, filter, noop, branchAndMerge} from '@angular-devkit/schematics';
import {strings, normalize, workspaces} from '@angular-devkit/core';
import {parseName} from '@schematics/angular/utility/parse-name';
import {getWorkspace} from '@schematics/angular/utility/workspace';
import {ProjectType} from '@schematics/angular/utility/workspace-models';

import {Schema as ComponentSchema} from './schema';
import {isLayoutComponent, isRelationsComponent, addObjectToArrayRule} from '../../utils';

/**
 * Build a default project path for generating.
 * @param project The project to build the path for.
 */
function buildDefaultPath(project: workspaces.ProjectDefinition): string 
{
    const root = project.sourceRoot ? `/${project.sourceRoot}/` : `/${project.root}/src/`;
  
    const projectDirName =
      project.extensions['projectType'] === ProjectType.Application ? 'app' : 'lib';
  
    return `${root}${projectDirName}`;
}

/**
 * Filters unwanted generation of unwanted files based on component type
 * @param options Component options
 * @returns Filtered rule
 */
function filterGeneratedFiles(options: ComponentSchema): Rule
{
    if ('layout-relations' === options.type)
    {
        return noop();
    }

    return filter(path => 
    {
        switch(options.type)
        {
            case 'layout':
                return !path.endsWith('relationsMetadata.ts.template') && 
                       !path.endsWith('Node.component.ts.template') &&
                       !path.endsWith('Node.component.html.template');
            case 'relations':
                return !path.endsWith('layoutMetadata.ts.template'); 
            default:
                return true;
        }
    });
}

function addLayoutRelations(options: ComponentSchema): Rule[]
{
    const rules: Rule[] = [];
    const componentName = strings.dasherize(options.name);

    if (isLayoutComponent(options.type))
    {
        rules.push(addObjectToArrayRule(`${options.path}/types.ts`, 'components', `
    '${componentName}',`));
    }

    if (isRelationsComponent(options.type))
    {
        rules.push(addObjectToArrayRule(`${options.path}/relations.ts`, 'relations', `
    '${componentName}',`));
    }

    return rules;
}

export default function(options: ComponentSchema): Rule 
{
    return async (host, _ctx) => 
    {
        
        const workspace = await getWorkspace(host);
        const project = getProjectFromWorkspace(workspace, options.project);

        if (options.path === undefined) 
        {
            options.path = buildDefaultPath(project);
        }

        const parsedPath = parseName(options.path!, options.name);

        options.name = parsedPath.name;
        options.path = parsedPath.path;

        const templateSource = apply(url('./files'), [
            filterGeneratedFiles(options),
            applyTemplates({
                ...strings,
                isLayoutComponent,
                isRelationsComponent,
                name: options.name,
                path: options.path,
                type: options.type,
            }),
            move(null as never, normalize(options.path as string))
        ]);

        return chain([
            branchAndMerge(chain([...addLayoutRelations(options), mergeWith(templateSource)])),
        ]);
    };
}
  