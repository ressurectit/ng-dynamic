[![npm version](https://badge.fury.io/js/%40anglr%2Fdynamic.svg)](https://badge.fury.io/js/%40anglr%2Fdynamic)
[![Build status](https://ci.appveyor.com/api/projects/status/x6vplfcp93gfqrce?svg=true)](https://ci.appveyor.com/project/kukjevov/ng-dynamic)

# Angular Dynamic (`@anglr/dynamic`)

Angular library for building **dynamic content from JSON metadata**. Pages are described as a *layout* (a tree of components with options) and their logic as *relations* (a graph that connects component outputs to component inputs). Both are plain JSON, so they can be stored on a server, rendered at runtime and edited in the built-in drag & drop **layout editor** and **relations editor**. Everything is **package-based**: components come from lazily loaded *packages* of *dynamic items*, and you can add your own packages next to the built-in ones.

| Entry point | Description |
| --- | --- |
| `@anglr/dynamic` | Core: `provideDynamic()`, feature system, dynamic item loading, packages (`PackageManager`, `PackageSource`), `MetadataStorage`, `MetadataHistoryManager`, `DefaultsOverride`, `EditorHotkeys`, extension base class, code editor |
| `@anglr/dynamic/layout` | Layout runtime: `*layoutComponentRenderer`, `LayoutComponentBase`, `LayoutRenderer`, `ComponentStylingExtension`, `withLayoutRuntime()` |
| `@anglr/dynamic/layout-editor` | Layout editor: `<layout-editor>`, editor metadata decorators, properties controls, property type controls, `withLayoutEditor()` |
| `@anglr/dynamic/relations` | Relations runtime: `RelationsManager`, `RelationsProcessor`, `@DynamicOutput()`, `@PureRelationsComponent()`, `RelationsRegistrationExtension`, `withRelationsRuntime()` |
| `@anglr/dynamic/relations-editor` | Relations editor: `<relations-editor>`, `RelationsNodeBase`, node building blocks, `withRelationsEditor()`, static components |
| `@anglr/dynamic/layout-relations` | Glue between layout and relations: `withLayoutRelationsRuntime()`, `withLayoutRelationsEditor()`, `LayoutManager`, custom components and custom relations |
| `@anglr/dynamic/relations-debugger` | Step-by-step visualizer of relations data transfers (experimental) |
| `@anglr/dynamic/basic-components` | Built-in package `basic-components`: layout containers, texts, buttons and logical/data relations nodes |
| `@anglr/dynamic/form` | Built-in package `form-components`: form fields and `FormComponentControlBuilder` |
| `@anglr/dynamic/material-components` | Built-in package `material-components`: Angular Material form fields, tabs, expansion panel |
| `@anglr/dynamic/css-components` | Built-in package `css-components`: scoped style block |
| `@anglr/dynamic/handlebars-components` | Built-in package `handlebars-components`: data rendered by handlebars templates |
| `@anglr/dynamic/rest-components` | Built-in package `rest-components`: REST request relations node |
| `@anglr/dynamic/tinymce-components` | Built-in package `tinymce-components`: rich text block edited by TinyMCE |
| `@anglr/dynamic/math-components` | Built-in package `math-components`: math relations nodes |
| `@anglr/dynamic/grid-components` | Built-in package `grid-components`: data table based on `@anglr/grid` |
| `@anglr/dynamic/styles` | SCSS mixins and functions (`buildThemeColors`, `buildThemeCss`, `buildTheme`, `defineTheme`) |
| `@anglr/dynamic/styles/themes/*` | SCSS themes `dark` and `light` |
| `@anglr/dynamic/typings/transformData/monaco-type`, `@anglr/dynamic/typings/state/monaco-type` | Type definitions (as text) used by code editors of the `transformData` and `state` relations nodes |

- [Resources](#resources)
- [Installation](#installation)
  - [Dependencies](#dependencies)
  - [Optional dependencies](#optional-dependencies)
  - [Project setup](#project-setup)
- [Quick Start](#quick-start)
- [Features](#features)
- [Core concepts](#core-concepts)
  - [Dynamic items](#dynamic-items)
  - [Packages](#packages)
  - [Metadata](#metadata)
  - [Loading pipeline](#loading-pipeline)
  - [Runtime and editor scopes](#runtime-and-editor-scopes)
  - [Built-in packages](#built-in-packages)
- [Providers and setup](#providers-and-setup)
  - [provideDynamic](#providedynamic)
  - [Core features](#core-features)
  - [Additional features](#additional-features)
  - [Package features](#package-features)
  - [Main DI tokens](#main-di-tokens)
- [Creating and using dynamic items](#creating-and-using-dynamic-items)
  - [Using built-in items](#using-built-in-items)
  - [Files and naming conventions](#files-and-naming-conventions)
  - [Creating items in your own project](#creating-items-in-your-own-project)
- [Customizing properties of dynamic items](#customizing-properties-of-dynamic-items)
  - [Options interface and model](#options-interface-and-model)
  - [Property metadata decorators](#property-metadata-decorators)
  - [Property types](#property-types)
  - [Properties controls](#properties-controls)
  - [Default options](#default-options)
  - [Custom property editors](#custom-property-editors)
- [Layout](#layout)
  - [Layout metadata](#layout-metadata)
  - [Rendering layout](#rendering-layout)
  - [LayoutComponentBase](#layoutcomponentbase)
  - [Containers and children](#containers-and-children)
  - [Extensions](#extensions)
  - [Missing components](#missing-components)
  - [Layout editor](#layout-editor)
- [Relations](#relations)
  - [How relations work](#how-relations-work)
  - [Relations metadata](#relations-metadata)
  - [Data propagation](#data-propagation)
  - [Kinds of relations nodes](#kinds-of-relations-nodes)
  - [Relations editor](#relations-editor)
  - [Relations debugger](#relations-debugger)
- [Extensibility](#extensibility)
- [Styling](#styling)
  - [Setup](#setup)
  - [Themes](#themes)
  - [CSS custom properties](#css-custom-properties)
- [Samples](#samples)
  - [Layout with relations](#layout-with-relations)
  - [⭐ Creating your own package of dynamic items](#-creating-your-own-package-of-dynamic-items)
  - [Custom layout component with editable properties](#custom-layout-component-with-editable-properties)
  - [Component that is both layout and relations](#component-that-is-both-layout-and-relations)
  - [Pure relations node](#pure-relations-node)
  - [Layout editor](#layout-editor-1)
  - [Relations editor](#relations-editor-1)
  - [Custom property editor](#custom-property-editor)
  - [Overriding properties controls](#overriding-properties-controls)
  - [Dynamic forms](#dynamic-forms)
  - [Loading metadata from storage](#loading-metadata-from-storage)
  - [Overriding defaults](#overriding-defaults)
  - [Static components in relations](#static-components-in-relations)
  - [Custom components](#custom-components)
- [Usage notes](#usage-notes)
- [Dev instructions](#dev-instructions)
- [License](#license)

## Resources

- **API reference**: https://ressurectit.github.io/#/content/api/ng-dynamic/dynamic
- **API layout reference**: https://ressurectit.github.io/#/content/api/ng-dynamic-layout/dynamic-layout
- **API layout editor reference**: https://ressurectit.github.io/#/content/api/ng-dynamic-layout-editor/dynamic-layout-editor
- **API relations reference**: https://ressurectit.github.io/#/content/api/ng-dynamic-relations/dynamic-relations
- **API relations editor reference**: https://ressurectit.github.io/#/content/api/ng-dynamic-relations-editor/dynamic-relations-editor
- **API basic components reference**: https://ressurectit.github.io/#/content/api/ng-dynamic-basic-components/dynamic-basic-components
- **API math components reference**: https://ressurectit.github.io/#/content/api/ng-dynamic-math-components/dynamic-math-components
- **Demo site**: https://ressurectit.github.io

## Installation

```bash
npm install @anglr/dynamic
```

### Dependencies

These are regular `dependencies` of the package, installed together with it: `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/cdk`, `@angular/material`, `@anglr/common`, `@jscrpt/common`, `@ng-dnd/core`, `react-dnd-html5-backend`, `angular2-hotkeys`, `monaco-editor`, `d3`, `lodash-es`, `rxjs`, `tslib`.

### Optional dependencies

Some built-in packages wrap third-party libraries. Install the optional dependency only when you use the entry point that needs it.

| Optional dependency | Needed by |
| --- | --- |
| `postcss`, `postcss-prefix-selector` | `@anglr/dynamic/css-components` |
| `handlebars` | `@anglr/dynamic/handlebars-components` |
| `@anglr/rest` | `@anglr/dynamic/rest-components` |
| `@tinymce/tinymce-angular`, `tinymce` | `@anglr/dynamic/tinymce-components` |
| `@anglr/grid` | `@anglr/dynamic/grid-components` |

### Project setup

**Build loaders.** The core imports `monaco-editor` (which pulls in a `.ttf` icon font) and `@anglr/dynamic/basic-components` imports `.monaco-type` files. The Angular build needs loaders for both, in `angular.json` → `architect.build.options`:

```json
"loader":
{
    ".monaco-type": "text",
    ".ttf": "file"
},
```

**TypeScript.** The decorators of the library (`@DynamicOutput()`, `@LayoutPropertyName()`, …) are property decorators that define accessors on the prototype. They need legacy decorators and class fields that don't shadow prototype accessors (`tsconfig.json` → `compilerOptions`):

```json
"experimentalDecorators": true,
```

```json
"useDefineForClassFields": false,
```

**Monaco editor assets.** Code editors (code properties controls, the `state` and `transformData` nodes) load Monaco at runtime from the path in the `MONACO_EDITOR_RESOURCES_PATH` token (default `'monaco-editor/vs'`). Serve `node_modules/monaco-editor/min` as the `monaco-editor` asset folder, or provide the token with your own path. Rendering layouts without code editors doesn't need these assets.

**TinyMCE assets** (only for `tinymce-components`). The rich text editor loads `tinymce.min.js` from the global `ngDynamicTinymcePath` (default `'tinymce'`), so serve TinyMCE assets under that path.

**Application-level providers.** Runtime rendering only needs what `provideDynamic()` provides (`LOGGER` and `ProgressIndicatorService` from `@anglr/common` have root defaults). The editors use more services from `@anglr/common`, which must be provided once in the application:

| Provider | Needed for |
| --- | --- |
| `providePermanentStorage(LocalPermanentStorage)` (`@anglr/common`, `@anglr/common/store`) | Layout editor (properties editor state, live events), `withPackageManager('STORAGE_NAME')` |
| `providePosition(FloatingUiDomPosition)` (`@anglr/common`, `@anglr/common/floating-ui`) | Layout editor (drop placeholders, overlays), relations debugger |
| `TitledDialogService` + `importProvidersFrom(MatDialogModule)` (`@anglr/common/material`) | Relations editor node properties, code editor dialogs |
| `HotkeyModule.forRoot()` (`angular2-hotkeys`) + `AppHotkeysService` (`@anglr/common/hotkeys`) | `withEditorHotkeys()` |
| `importProvidersFrom(DndModule.forRoot({backend: HTML5Backend}))` + `DndService` (`@ng-dnd/core`, `react-dnd-html5-backend`) | Layout editor drag & drop |

The drag & drop providers can live on the route that contains the editors. `DndService` is `providedIn: 'root'`, so when `DndModule.forRoot()` isn't in the root injector, `DndService` must be provided next to it:

```ts
import {importProvidersFrom} from '@angular/core';
import {Route} from '@angular/router';
import {DndModule, DndService} from '@ng-dnd/core';
import {HTML5Backend} from 'react-dnd-html5-backend';
```

```ts
    providers:
    [
        //drag and drop used by layout editor, required only for editors
        importProvidersFrom(DndModule.forRoot({backend: HTML5Backend})),
        //DndService is providedIn root, it must be provided here too, otherwise it is created in root injector without DragDropManager
        DndService,
    ],
```

**Development server.** The item loaders of the built-in packages use relative dynamic imports (``import(`../../dynamicItems/${name}/type.js`)``). Vite dependency prebundling of `ng serve` moves the code into its cache folder, the relative paths stop resolving, and every item renders as *not found*. Turn prebundling off in `angular.json` → `architect.serve.options`:

```json
"prebundle": false
```

**Styles.** The editors and the built-in components need the library CSS, see [Styling](#styling).

**Build-time globals (optional).** The library reads three globals that can be set with the `define` option of the Angular build:

| Global | Default | Description |
| --- | --- | --- |
| `ngDesignerMetadata` | `true` | When `false`, the editor metadata decorators (`@LayoutEditorMetadata`, `@RelationsEditorMetadata`, `@LayoutProperty*`) become no-ops, so editor metadata isn't loaded in runtime-only builds |
| `ngRelationsDebugger` | `false` | When `true`, the debugger hooks of the relations runtime are active; required by the [relations debugger](#relations-debugger) |
| `ngDynamicTinymcePath` | `'tinymce'` | Path to TinyMCE assets |

## Quick Start

Render layout metadata with the built-in `basic-components` package. `provideDynamic()` is usually placed in the `providers` of the component that renders the layout, so every page gets its own dynamic scope.

```ts
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata, LayoutComponentRendererDirective, withLayoutRuntime} from '@anglr/dynamic/layout';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {quickStartLayout} from './quickStart.data';

/**
 * Renders layout metadata at runtime
 */
@Component(
{
    selector: 'quick-start-sample',
    templateUrl: 'quickStart.component.html',
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    providers:
    [
        provideDynamic(withLayoutRuntime(),
                       withBasicComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickStartComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Layout metadata to be rendered
     */
    protected metadata: LayoutComponentMetadata = quickStartLayout;
}
```

```html
<ng-container *layoutComponentRenderer="metadata"/>
```

The metadata is a tree of `{id, package, name, options}` nodes. Containers keep their children inside `options` (`children` for `stackPanel`). Styling options (`textStyling`) and options of the parent's child extension (`flex` from `stackPanel`) live in the same `options` object:

```ts
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Layout metadata rendered by quick start sample, usually loaded from server
 */
export const quickStartLayout: LayoutComponentMetadata =
{
    id: 'stackPanel-root',
    displayName: 'root',
    package: 'basic-components',
    name: 'stackPanel',
    options:
    {
        horizontal: false,
        children:
        [
            {
                id: 'textBlock-title',
                package: 'basic-components',
                name: 'textBlock',
                options:
                {
                    text: 'Hello from dynamic layout',
                    textStyling:
                    {
                        fontSize: '20px',
                        fontWeight: 700,
                    },
                },
            },
            {
                id: 'stackPanel-row',
                package: 'basic-components',
                name: 'stackPanel',
                options:
                {
                    horizontal: true,
                    children:
                    [
                        {
                            id: 'textBlock-description',
                            package: 'basic-components',
                            name: 'textBlock',
                            options:
                            {
                                text: 'Everything on this page is rendered from JSON metadata',
                                flex: '1',
                            },
                        },
                        {
                            id: 'button-ok',
                            package: 'basic-components',
                            name: 'button',
                            options:
                            {
                                text: 'Click me',
                                buttonCssClass: 'btn btn-primary',
                                type: 'button',
                                disabled: false,
                            },
                        },
                    ],
                },
            },
        ],
    },
};
```

## Features

- **Metadata-driven UI** – pages are JSON (`LayoutComponentMetadata` tree + `RelationsComponentMetadata[]` graph) that can be stored anywhere and rendered with one structural directive.
- **Relations instead of code** – component outputs are wired to component inputs in metadata; non-visual *relations nodes* (negation, logical AND/OR, merge, debounce, state, REST, math, …) transform data on the way.
- **Visual editors** – drag & drop **layout editor** with component palette, component tree, properties editor, undo/redo and hotkeys; **relations editor** with node palette and canvas.
- **Package-based and lazy** – every item is loaded on demand with dynamic `import()`, editor metadata is loaded lazily as well and can be stripped from runtime builds.
- **Built-in packages** – basic layout, form fields, Angular Material, scoped CSS, handlebars, REST, TinyMCE, math and `@anglr/grid` data tables.
- **Your own packages** – the same mechanism the built-in packages use is public: options interface, component, editor metadata, `type.ts`, providers and one `with…()` feature.
- **Editable properties** – properties editor generated from decorated models, with built-in property types, custom properties controls and overridable defaults.
- **Extensions** – reusable behavior attached to items (`ComponentStylingExtension` for CSS class, margin, padding and text styling; child extensions like `flex` in stack panels).
- **Reuse** – *template blocks* and *custom components* render stored layouts with their relations as one component.
- **Swappable services** – loaders, module providers, extractors, metadata storages, package manager, history manager, defaults override and renderer are all DI-based.
- **Themable** – SCSS themes and `--dynamic-*` CSS custom properties.

## Core concepts

### Dynamic items

A *dynamic item* is anything that can be referenced from metadata and loaded on demand. It's identified by a `DynamicItemSource`:

| Property | Type | Description |
| --- | --- | --- |
| `package` | `string` | Name of the package that contains the item, e.g. `'basic-components'` |
| `name` | `string` | Name of the item inside the package, e.g. `'stackPanel'` |

Metadata of a concrete item instance (`DynamicItemMetadata`) adds:

| Property | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique id of the item instance |
| `displayName` | `string` (optional) | Name shown in editors |
| `scope` | `string \| null` (optional) | Id of scope used for components and relations |

There are two kinds of items, which can be combined in one class:

- **Layout components** (`LayoutComponent`) – Angular components rendered by the layout renderer, configured by `options`.
- **Relations components** (`RelationsComponent`) – participants of relations, configured by `relationsOptions`, with inputs and `@DynamicOutput()` outputs.

Every item is a `DynamicItem`, so it implements `invalidateVisuals()`. Optional lifecycle interfaces are `DynamicOnInit` (`dynamicOnInit()`), `DynamicOnChanges` (`dynamicOnChanges(changes)`) and `DynamicAfterViewInit` (`dynamicAfterViewInit()`).

### Packages

A *package* is a named set of items (`basic-components`, `form-components`, your own `my-components`, …). Each item lives in its own folder with a `type.ts` module. The loader reads these exports from it:

| Export | Required | Description |
| --- | --- | --- |
| `default` | yes | The component class (layout) or relations class |
| `extensions` | no | Array of extensions applied to the item (or `{extensions, childExtensions}`) |
| `childExtensions` | no | Array of extensions applied to every child rendered inside the item |
| `relations` | no | Alternative export of a pure relations class |

```ts
import {ComponentStylingExtension} from '@anglr/dynamic/layout';
import {RelationsRegistrationExtension} from '@anglr/dynamic/relations';

import {CounterComponent} from './counter.component';

export default CounterComponent;

export const extensions = [ComponentStylingExtension, RelationsRegistrationExtension];
```

A package also has two lists used by the editor palettes: `types.ts` (default export: names of layout components) and `relations.ts` (default export: names of pure relations nodes).

### Metadata

| Metadata | Interface | Shape |
| --- | --- | --- |
| Layout | `LayoutComponentMetadata<TOptions>` (`@anglr/dynamic/layout`) | `{id, package, name, displayName?, scope?, options}` – a tree, children are stored inside `options` |
| Relations | `RelationsComponentMetadata<TOptions>[]` (`@anglr/dynamic/relations`) | `{id, package, name, displayName?, scope?, relationsOptions, outputs?: [{outputName, inputs: [{id, inputName}]}]}` |
| Relations in editor | `RelationsNodeMetadata[]` (`@anglr/dynamic/relations-editor`) | Relations metadata + `nodeMetadata: {coordinates: {x, y}, scopeConfigurable, options}` |

The relations runtime accepts `RelationsNodeMetadata[]` as well, the editor-only `nodeMetadata` is ignored there.

### Loading pipeline

Items are loaded by a `DynamicItemLoader`. For a `DynamicItemSource` it:

1. asks every registered `DynamicModuleProvider` (`tryToGet(source)`) and takes the first module returned (an ES module from `import()`),
2. passes the module to `DynamicModuleDataExtractor`s, which read the exports (`default`, `extensions`, …) into an item definition,
3. validates the result and caches it by `package` + `name`.

Packages plug into this pipeline only by registering their `DynamicModuleProvider`s on multi tokens (`LAYOUT_COMPONENTS_MODULE_PROVIDERS`, `RELATIONS_COMPONENTS_MODULE_PROVIDERS`, …). The loaders themselves are created by the core features.

| Loader token | Providers token (multi) | Extractors token (multi) | Used by |
| --- | --- | --- | --- |
| `LAYOUT_COMPONENTS_LOADER` | `LAYOUT_COMPONENTS_MODULE_PROVIDERS` | `LAYOUT_COMPONENTS_MODULE_DATA_EXTRACTORS` | Layout renderer |
| `LAYOUT_MODULE_TYPES_LOADER` | `LAYOUT_MODULE_TYPES_PROVIDERS` | `LAYOUT_MODULE_TYPES_DATA_EXTRACTORS` | Layout editor palette (`types.ts`) |
| `RELATIONS_COMPONENTS_LOADER` | `RELATIONS_COMPONENTS_MODULE_PROVIDERS` | `RELATIONS_COMPONENTS_MODULE_DATA_EXTRACTORS` | Relations runtime (pure nodes) |
| `RELATIONS_MODULE_TYPES_LOADER` | `RELATIONS_MODULE_TYPES_PROVIDERS` | `RELATIONS_MODULE_TYPES_DATA_EXTRACTORS` | Relations editor palette (`relations.ts`) |
| `RELATIONS_NODES_LOADER` | `RELATIONS_NODES_PROVIDERS` | `RELATIONS_NODES_DATA_EXTRACTORS` | Relations editor nodes |

### Runtime and editor scopes

`provideDynamic()` combines one or more **core features** with any number of **features**. Core features decide *what the scope does*: layout runtime, relations runtime, layout editor, relations editor. Features (like `withBasicComponents()`) contribute providers per scope type, and only the parts relevant for the enabled core features are used. That's why the same `withBasicComponents()` works on a runtime page and in an editor.

All services (renderer, relations processor, editor managers) are provided by `provideDynamic()`, not in root. Each component with `provideDynamic()` in its `providers` gets its own independent layout and relations.

### Built-in packages

| Entry point / feature | Package name | Layout components | Relations nodes |
| --- | --- | --- | --- |
| `@anglr/dynamic/basic-components` `withBasicComponents()` | `basic-components` | `block`, `button`, `gridPanel`, `htmlBlock`, `ifBlock`, `listBlock`, `stackPanel`, `templateBlock`, `textBlock`, `toggleButton` | `debounceValue`, `deconstruct`, `empty`, `firstNonNull`, `logicalAnd`, `logicalOr`, `match`, `merge`, `negation`, `state`, `syncValues`, `transformData`, `trigger`, `value` |
| `@anglr/dynamic/form` `withFormComponents()` | `form-components` | `formGroup`, `textField`, `numberField`, `textarea`, `checkbox`, `radio`, `select`, `datepicker`, `period` | – |
| `@anglr/dynamic/material-components` `withMaterialComponents()` | `material-components` | `textField`, `numberField`, `textarea`, `checkbox`, `radio`, `select`, `datepicker`, `period`, `expansionPanel`, `tabGroup` | – |
| `@anglr/dynamic/css-components` `withCssComponents()` | `css-components` | `styleBlock` | – |
| `@anglr/dynamic/handlebars-components` `withHandlebarsComponents()` | `handlebars-components` | `dataBlock` | `dataTemplate` |
| `@anglr/dynamic/rest-components` `withRestComponents()` | `rest-components` | – | `rest` |
| `@anglr/dynamic/tinymce-components` `withTinyMceComponents()` | `tinymce-components` | `richTextBlock` | `richTextSource` |
| `@anglr/dynamic/math-components` `withMathComponents()` | `math-components` | – | `add`, `subtract`, `multiply`, `divide`, `power`, `round` |
| `@anglr/dynamic/grid-components` `withGridComponents()` | `grid-components` | `dataTable`, `gridColumn`, `asyncDataLoader`, `syncDataLoader`, `basicPaging`, `previousNextPaging`, `dialogMetadataSelector`, `showMetadataSelectorButton` | – |

Several layout components are also relations components with their own inputs and outputs, for example:

| Item | Relations inputs | Relations outputs |
| --- | --- | --- |
| `basic-components/button` | `disabled` | `click` |
| `basic-components/toggleButton` | `disabled` | `toggle` |
| `basic-components/ifBlock` | `condition` | – |
| `basic-components/htmlBlock` | `content` | – |
| `basic-components/listBlock` | `data` | `datum`, `index`, `first`, `last` (provided per rendered item by the scoped `ListBlockRelations`) |
| form fields (`form-components`, `material-components`) | `value`, `disabled`, `required` (`select` also `values`) | `valueOutput` |

Some packages are created by the features themselves: `layout-components` (layout components used as relations nodes), `static-components` (template components used as relations nodes), `custom-components` and `custom-relations`.

## Providers and setup

### provideDynamic

Signature: `provideDynamic(coreFeatures: CoreDynamicFeature[]|CoreDynamicFeature, ...features: DynamicFeature[]): Provider[]`.

It returns a plain `Provider[]`, usable in component `providers` (recommended) or in a route / application config. Typical combinations:

| Scope | Core feature | Typical features |
| --- | --- | --- |
| Render layout | `withLayoutRuntime()` | package features, `withLayoutMetadataStorage()` |
| Run relations only (template components) | `withRelationsRuntime()` | package features |
| Render layout with relations | `withLayoutRelationsRuntime()` | package features, `withLayoutMetadataStorage()`, `withRelationsMetadataStorage()`, `withCustomComponents()` |
| Layout editor | `withLayoutEditor()` | `withPackageManager()`, `withEditorHotkeys()`, `withLayoutDefaultsOverride()`, package features |
| Relations editor | `withRelationsEditor()` | `withPackageManager()` (required), `withStaticComponents()`, `withRelationsDefaultsOverride()`, package features |
| Relations editor for a layout | `withLayoutRelationsEditor()` | same as relations editor |

### Core features

| Function | Entry point | Description |
| --- | --- | --- |
| `withLayoutRuntime()` | `@anglr/dynamic/layout` | Layout loader and default extractors, `LayoutRenderer`, default `MetadataStorage` for layouts |
| `withLayoutEditor()` | `@anglr/dynamic/layout-editor` | Includes layout runtime; adds editor renderer, palette loader, editor metadata extractors, `LayoutEditorMetadataManager`, non-persistent `PackageManager`, `LAYOUT_HISTORY_MANAGER`, `EDITOR_METADATA_MANAGER` |
| `withRelationsRuntime()` | `@anglr/dynamic/relations` | Relations loader, `RelationsManager`, `RelationsComponentManager`, `RelationsProcessor`, `RelationsChangeDetector`, `CodeExecutor` |
| `withRelationsEditor()` | `@anglr/dynamic/relations-editor` | Palette and node loaders, `RelationsNodeManager`, `ScopeRegister`, `RELATIONS_HISTORY_MANAGER`, `EDITOR_METADATA_MANAGER` |
| `withLayoutRelationsRuntime()` | `@anglr/dynamic/layout-relations` | Layout runtime + relations runtime |
| `withLayoutRelationsEditor()` | `@anglr/dynamic/layout-relations` | Layout runtime + relations editor; layout components of the layout passed to `LayoutManager.setLayout()` become relations nodes (package `layout-components`) |

### Additional features

| Function | Entry point | Applies to | Description |
| --- | --- | --- | --- |
| `withPackageManager(storageOrPackageManager)` | `@anglr/dynamic` | layout editor, relations editor | `string` = storage name, the selection of used packages is persisted in `PERMANENT_STORAGE`; or a `PackageManager` type; or `factoryFn(() => …)` |
| `withEditorHotkeys()` | `@anglr/dynamic` | layout editor, relations editor | `EditorHotkeys`: `ctrl+s` save, `ctrl+z` undo, `ctrl+y` redo, `del` delete, `ctrl+c`/`ctrl+x`/`ctrl+v` copy/cut/paste |
| `withLayoutMetadataStorage(type)` | `@anglr/dynamic/layout` | layout runtime | `MetadataStorage` for layouts loaded by id (`templateBlock`, custom components) |
| `withRelationsMetadataStorage(type)` | `@anglr/dynamic/relations` | layout runtime | `MetadataStorage` for relations loaded by id; use it with a core feature that contains the layout runtime (`withLayoutRelationsRuntime()`, `withLayoutRelationsEditor()`) |
| `withLayoutDefaultsOverride(type)` | `@anglr/dynamic/layout-editor` | layout editor | `DefaultsOverride` for items dropped from the layout palette |
| `withRelationsDefaultsOverride(type)` | `@anglr/dynamic/relations-editor` | relations editor | `DefaultsOverride` for nodes dropped from the relations palette |
| `withStaticComponents(register)` | `@anglr/dynamic/relations-editor` | relations editor | Template components registered by a `StaticComponentsRegister` become nodes of package `static-components` |
| `withCustomComponents(register?, ...refreshObservables)` | `@anglr/dynamic/layout-relations` | layout runtime, layout editor, relations editor | Reusable stored layouts with relations as items of package `custom-components`; the register is used by the editors |
| `withCustomRelations(register?, ...refreshObservables)` | `@anglr/dynamic/layout-relations` | relations runtime, relations editor | Reusable stored relations as nodes of package `custom-relations` |
| `withFormControlBuilder()` | `@anglr/dynamic/form` | layout runtime | `FormComponentControlBuilder` that builds a `FormGroup` from layout metadata |

### Package features

`withBasicComponents()`, `withFormComponents()`, `withMaterialComponents()`, `withCssComponents()`, `withHandlebarsComponents()`, `withRestComponents()`, `withTinyMceComponents()`, `withMathComponents()`, `withGridComponents()` – each registers the providers of one built-in package (see [Built-in packages](#built-in-packages)). Your own package gets its own feature in the same way, see [Creating your own package](#-creating-your-own-package-of-dynamic-items).

### Main DI tokens

Loader, module provider and extractor tokens are listed in [Loading pipeline](#loading-pipeline).

| Token | Entry point | Description |
| --- | --- | --- |
| `EDITOR_METADATA_MANAGER` | `@anglr/dynamic` | `EditorMetadataManager` of the current editor, `getMetadata()` returns the edited metadata |
| `PACKAGE_SOURCES` | `@anglr/dynamic` | Multi token of `PackageSource`s, the packages offered by the package manager |
| `SCOPE_ID` | `@anglr/dynamic` | Id of the current scope |
| `MONACO_EDITOR_RESOURCES_PATH` | `@anglr/dynamic` | Path to Monaco editor resources, default `'monaco-editor/vs'` |
| `LAYOUT_METADATA_STORAGE` | `@anglr/dynamic/layout` | `MetadataStorage` of layouts |
| `LAYOUT_HISTORY_MANAGER` | `@anglr/dynamic/layout-editor` | `MetadataHistoryManager` of the layout editor |
| `LAYOUT_DEFAULTS_OVERRIDE` | `@anglr/dynamic/layout-editor` | `DefaultsOverride` of the layout editor |
| `LAYOUT_EDITOR_PROPERTY_TYPE_CONTROLS` | `@anglr/dynamic/layout-editor` | Dictionary of property type name → property type control component |
| `LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES` | `@anglr/dynamic/layout-editor` | Symbols under which property metadata decorators store their data |
| `REFRESH_PALETTE_OBSERVABLES` | `@anglr/dynamic/layout-editor`, `@anglr/dynamic/relations-editor` | Multi token, observables that refresh the palette; each entry point exports its **own distinct** token with this name (one for the layout editor palette, one for the relations editor palette) |
| `RELATIONS_METADATA_STORAGE` | `@anglr/dynamic/relations` | `MetadataStorage` of relations |
| `RELATIONS_HISTORY_MANAGER` | `@anglr/dynamic/relations-editor` | `MetadataHistoryManager` of the relations editor |
| `RELATIONS_DEFAULTS_OVERRIDE` | `@anglr/dynamic/relations-editor` | `DefaultsOverride` of the relations editor |
| `FORM_COMPONENT_CONTROL` | `@anglr/dynamic/form` | Parent form control (`AbstractControl`, usually a `FormGroup`) for form components |
| `BUTTONS_PRESETS` | `@anglr/dynamic/basic-components` | Button presets (`{text?, cssClass}`) offered in button properties |

## Creating and using dynamic items

### Using built-in items

1. Add the package feature to `provideDynamic()` (`withBasicComponents()`, `withMaterialComponents()`, …).
2. Reference items in metadata by `package` and `name` and give every instance a unique `id`.
3. Render the layout with `*layoutComponentRenderer` and, when relations are used, pass the relations metadata to `RelationsManager.setRelations()`.
4. In editors, items show up in the palette once their package is used: either pass `[packages]` to the editor or let the user select packages in the built-in package manager.

### Files and naming conventions

Built-in packages follow these conventions, and a package of your own should follow them too. One folder per item, the folder name is the item `name`.

| File | Content |
| --- | --- |
| `<name>.options.ts` | Options interface: `<Name>ComponentOptions` (layout) or `<Name>RelationsOptions` (relations) |
| `<name>.component.ts` / `.html` | Layout component, extends `LayoutComponentBase<Options>` |
| `<name>.relations.ts` | Pure relations component, decorated with `@PureRelationsComponent()` |
| `<name>.metadata.ts` | Lazy loaders of editor metadata (`DynamicMetadataLoader`) |
| `metadata/<name>.layoutMetadata.ts` | `LayoutEditorMetadataDescriptor` – palette info, properties, default options, children handling |
| `metadata/<name>.model.ts` | Model for the properties editor, decorated with `@LayoutProperty*` |
| `metadata/<name>.relationsMetadata.ts` | `RelationsEditorMetadataDescriptor` – palette info, default options, node component |
| `node/<name>Node.component.ts` / `.html` | Node displayed in the relations editor, extends `RelationsNodeBase` |
| `misc/…`, `extensions/…` | Item specific properties controls, extensions |
| `type.ts` | Module loaded by the loader: `default` export + optional `extensions` / `childExtensions` |

Package level files:

| File | Content |
| --- | --- |
| `types.ts` | Default export: names of layout components shown in the layout palette |
| `relations.ts` | Default export: names of pure relations nodes shown in the relations palette |
| `services/*` | Three `DynamicModuleProvider`s: items (`type.ts` of an item), types (`types.ts`), relations (`relations.ts`) |
| `features.ts` | `with<Package>()` function returning a `DynamicFeature` |
| `index.ts` | Public exports: options interfaces and the feature |

### Creating items in your own project

The complete, recommended setup is shown in [⭐ Creating your own package of dynamic items](#-creating-your-own-package-of-dynamic-items). In short:

1. Create the item folder with options, component (or relations class), editor metadata and `type.ts`.
2. List the item in `types.ts` (layout components) or `relations.ts` (pure relations nodes).
3. Write three `DynamicModuleProvider`s that return modules for your package name and `null` for any other package.
4. Write a `with…()` function returning a `DynamicFeature` that registers the providers for each scope, plus `provideStaticPackageSource('<package>')` for the editors.
5. Add the feature to `provideDynamic()` next to the built-in ones.

Layout components that are also relations components don't belong to `relations.ts`; in the relations editor they appear as nodes of the `layout-components` package.

## Customizing properties of dynamic items

### Options interface and model

The *options interface* (`<name>.options.ts`) is the runtime contract: it describes `metadata.options` of a layout component, available as `this.options` in the component. The properties editor works with a *model*: a class implementing the options interface whose properties carry editor metadata. The model is registered in `metaInfo.optionsMetadata.propertiesMetadata` of the item's `LayoutEditorMetadataDescriptor` together with the controls that edit it:

```ts
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: ComponentStylingModel,
                    propertiesControls:
                    [
                        getPropertiesControl(ComponentStylingPropertiesControlComponent),
                    ],
                },
                {
                    modelType: CounterModel,
                    propertiesControls:
                    [
                        genericPropertiesControlFor<CounterModel>(['label', 'step']),
                    ],
                },
            ],
        },
```

`LayoutEditorOptionsMetadata` also has `childPropertiesMetadata` – properties shown on the *children* of a container, used for options read by child extensions (like `flex` of a stack panel child).

```ts
import {DefaultKnownPropertyTypes, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {CounterComponentOptions} from '../counter.options';

/**
 * Counter model for properties editor
 */
export class CounterModel implements CounterComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Label')
    @LayoutPropertyDescription('Label displayed next to current count')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public label: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Step')
    @LayoutPropertyDescription('Value added to count on each click')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputNumber')
    public step: number|undefined|null = null;

    //######################### constructor #########################
    constructor(value: CounterComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}
```

The default value of a model property is only the default of the properties editor. A newly dropped component gets `metaInfo.defaultOptions`, an existing component keeps its own options.

### Property metadata decorators

All from `@anglr/dynamic/layout-editor`:

| Decorator | Description |
| --- | --- |
| `@LayoutPropertyName(name)` | Label of the property in the properties editor |
| `@LayoutPropertyDescription(description)` | Description shown as a tooltip |
| `@LayoutPropertyType<TType>(type)` | Property type, selects the control that edits the value (see below) |
| `@LayoutPropertyValues<TType>(values)` | Values offered by `selectValue` |
| `@LayoutPropertyObject(type, metadataSymbols)` | Nested object with its own property metadata |

A property without `@LayoutPropertyType` isn't rendered by the generic properties control. That's useful for options edited by a custom control (see [Custom property editor](#custom-property-editor)) or for children (`content`).

### Property types

Property types available by default (registered in `LAYOUT_EDITOR_PROPERTY_TYPE_CONTROLS`):

| Type | Control |
| --- | --- |
| `inputString` | Text input (`InputStringComponent`) |
| `textarea` | Multi-line text (`TextareaComponent`) |
| `inputNumber` | Number input (`InputNumberComponent`) |
| `inputBoolean` | Checkbox (`InputBooleanComponent`) |
| `selectValue` | Select of `@LayoutPropertyValues` (`SelectValueComponent`) |

### Properties controls

A *properties control* is one block of the properties editor. It's referenced by a getter in `propertiesControls`:

| Getter | Description |
| --- | --- |
| `genericPropertiesControlFor<TModel>(properties)` | Renders listed properties of the model, each by its property type |
| `getPropertiesControl(type)` | Uses any component implementing `PropertiesControl` (built-in `ComponentStylingPropertiesControlComponent` edits CSS class, margin and padding) |
| `codePropertiesControlFor<TModel>(property, languageModel)` | Edits one property in a Monaco code editor dialog (language models `CssLanguageModel`, `HtmlLanguageModel`, `JsonLanguageModel`, `HandlebarsLanguageModel`, `TypescriptLanguageModel`) |

The getters resolve the component **through DI**, in the injection context of the properties editor. The component type is the token, and the provided value is the component type to render. `genericPropertiesControlFor()` resolves `DefaultGenericPropertiesControlComponent`, `codePropertiesControlFor()` resolves `BaseCodePropertiesControlComponent`, and `getPropertiesControl(type)` resolves `type`. When `type` isn't provided, `getPropertiesControl(type)` falls back to `type` itself. This makes every properties control **overridable** without touching the metadata of items:

```ts
<ValueProvider>
{
    provide: ComponentStylingPropertiesControlComponent,
    useValue: StylingPropertiesControlComponent,
},
```

`withLayoutEditor()` provides `ComponentStylingPropertiesControlComponent`, `DefaultGenericPropertiesControlComponent` and `BaseCodePropertiesControlComponent` as overridable tokens. The built-in package features (`withBasicComponents()`, `withFormComponents()`, `withMaterialComponents()`, `withTinyMceComponents()`, `withCustomComponents()`) do the same for their item specific properties controls; the publicly exported ones are `ButtonPresetsPropertiesControlComponent` and `RowsColumnsPropertiesControlComponent` (`@anglr/dynamic/basic-components`). Place the override after `provideDynamic()` in the same `providers` array, or in the `layoutEditor` providers of your own `DynamicFeature`. Your own properties controls registered with `getPropertiesControl(MyControlComponent)` can be overridden in the same way. See [Overriding properties controls](#overriding-properties-controls).

### Default options

- **Layout**: `metaInfo.defaultOptions` of `LayoutEditorMetadataInfo` – options of a component dropped from the palette.
- **Relations**: `metaInfo.defaultOptions` of `RelationsEditorMetadataInfo` – `relationsOptions` of a node dropped from the palette.
- **Per application**: an implementation of `DefaultsOverride` (`getOptions(packageName, name, defaultOptions)`, `getDisplayName(packageName, name, displayName?)`) registered with `withLayoutDefaultsOverride()` / `withRelationsDefaultsOverride()` changes defaults of any item, including built-in ones. See [Overriding defaults](#overriding-defaults).

### Custom property editors

- **Custom properties control** – a component extending `PropertiesControlBase<TOptions>` (implements `PropertiesControl`). It gets the `form` (a `FormGroup` built from the model), `options` and `propertiesMetadata`; any value set into `form` is applied to the component and recorded in history. Register it with `getPropertiesControl(MyControlComponent)`. See [Custom property editor](#custom-property-editor).
- **Custom property type** – a component extending `PropertyTypeControlBase<TValue>` (implements `PropertyTypeControl`, with `control: FormControl` and `values`). Provide `LAYOUT_EDITOR_PROPERTY_TYPE_CONTROLS` with a dictionary that contains the default controls (exported `InputStringComponent`, `InputBooleanComponent`, `SelectValueComponent`, `TextareaComponent`, `InputNumberComponent`) plus your own type name. The token isn't multi, so the provided dictionary replaces the default one.

## Layout

### Layout metadata

Layout is a tree of `LayoutComponentMetadata`. There's no generic `children` property: each container stores its children inside its `options` in its own shape (`children: LayoutComponentMetadata[]` for `stackPanel`, `content: LayoutComponentMetadata` for `block`, `ifBlock` or the `infoCard` sample). Options consumed by extensions are plain properties of the same `options` object:

| Options | Consumed by |
| --- | --- |
| `cssClass`, `margin {top, right, bottom, left}`, `padding {top, right, bottom, left}`, `textStyling {fontSize, fontWeight}` | `ComponentStylingExtension` (`@anglr/dynamic/layout`) |
| `flex` (on a child of `stackPanel`) | Child extension of `stackPanel` |

Ids must be unique within one rendered layout.

### Rendering layout

`LayoutComponentRendererDirective` (selector `[layoutComponentRenderer]`, also exported by `DynamicLayoutModule`) renders one metadata node and everything below it:

```html
<ng-container *layoutComponentRenderer="metadata"/>
```

| Input | Type | Description |
| --- | --- | --- |
| `layoutComponentRenderer` | `LayoutComponentMetadata \| undefined \| null` | Metadata to render; changing it re-renders, `null` removes the component |
| `layoutComponentRendererCallback` | `Action1<unknown>` | Called with the rendered item after the component is fully initialized |
| `layoutComponentRendererProviders` | `Provider[]` | Extra providers for the injector of the rendered component (micro syntax `*layoutComponentRenderer="metadata; providers: formProviders"`) |

`LayoutRenderer` loads the component type, creates the component, applies extensions, sets `options` and calls `dynamicOnChanges`, `dynamicOnInit`, `invalidateVisuals` and `dynamicAfterViewInit`. Public members: `renderingFinished` (observable), `hasComponent(id)`, `hasRenderer(id)`, `destroyRenderer(id)`, `unregisterRenderer(id)`.

### LayoutComponentBase

`LayoutComponentBase<TOptions>` (`@anglr/dynamic/layout`) implements the `LayoutComponent` contract. Options aren't Angular inputs: the renderer assigns `options` and calls the dynamic lifecycle methods, which call these overridable hooks:

| Hook | Called |
| --- | --- |
| `onInit()` | Once, when the component is initialized |
| `onOptionsSet()` | After `onInit()` and after every later change of options |
| `afterInit()` | After extensions are initialized |
| `onOptionsChange()` | On every change of options except the first |
| `onChanges(changes)` | On changes other than options – relations inputs arrive here |
| `onDestroy()` | When the component is destroyed |

Protected members: `optionsSafe` (throws if options are missing), `element`, `extensionsOptions`, `changeDetector`, `componentElement`, `injector`, `logger`. `invalidateVisuals()` runs change detection of the component. Rendered components are detached from Angular change detection, so call `invalidateVisuals()` after the component changes its own state (for example in a click handler).

### Containers and children

A container renders its children with the same directive and tells the editor where the children are:

- `@DescendantsGetter<TOptions>(options => …)` (`@anglr/dynamic/layout-editor`) on the component class returns the child metadata. It's used to walk the tree (component tree, `LayoutComponentsIteratorService`).
- `LayoutEditorMetadataDescriptor` handles editing: `addDescendant(metadata, options, index)`, `removeDescendant(id, options)`, `canDropMetadata(options)`, `getChildrenContainer(element)`, `isHorizontalDrop(options)`, `customDragType()`, `customDropTypes()`.
- `metaInfo.dragDisabled` prevents dragging, `metaInfo.scoped` marks a component that creates its own scope.

A single-child container is shown in [Custom layout component with editable properties](#custom-layout-component-with-editable-properties).

### Extensions

An *extension* is a class attached to an item through `extensions` (the item itself) or `childExtensions` (every child of a container) in `type.ts`. It's created with the item metadata and gets the injector, host element, component instance and options. Base class `DynamicItemExtensionBase<TOptions, TInstance>` (`@anglr/dynamic`) with hooks `onInit()`, `onOptionsChange()`, `onDestroy()` and fields `injector`, `element`, `options`, `instance`, `metadata`.

| Extension | Entry point | Description |
| --- | --- | --- |
| `ComponentStylingExtension` | `@anglr/dynamic/layout` | Applies `cssClass`, `margin`, `padding`, `textStyling` to the host element |
| `RelationsRegistrationExtension` | `@anglr/dynamic/relations` | Registers a layout component in relations under its layout `id` |

### Missing components

When a layout component can't be loaded, `LayoutRendererOptions.missingTypeBehavior` decides what happens: `MissingTypeBehavior.ShowNotFound` (default, renders a *not found* placeholder), `MissingTypeBehavior.Ignore` or `MissingTypeBehavior.ThrowError`. Provide an instance of `LayoutRendererOptions` (constructor argument `missingTypeBehavior`) to change it.

### Layout editor

`<layout-editor>` (`LayoutEditorComponent`, needs `withLayoutEditor()`) contains the component tree, the palette (with search and package manager), the canvas and the properties editor.

| Input | Type | Description |
| --- | --- | --- |
| `metadata` | `LayoutComponentMetadata \| undefined \| null` | Root of the edited layout; setting it resets history |
| `packages` | `string[] \| undefined \| null` | Packages shown in the palette; when set, the package manager UI is hidden |
| `whiteList` | `DynamicItemSource[] \| undefined \| null` | Only these items of the listed packages are shown |
| `blackList` | `DynamicItemSource[] \| undefined \| null` | Items hidden from the palette |

The editor has no save output. Saving is up to the application:

- **current metadata** – inject `EDITOR_METADATA_MANAGER` and call `getMetadata()`,
- **history** – inject `LAYOUT_HISTORY_MANAGER` (`MetadataHistoryManager`): `undo()`, `redo()`, `canUndo`, `canRedo`, `save()` (marks current state as saved), `saved`, `historyChange`,
- **hotkeys** – with `withEditorHotkeys()` the editor handles undo/redo/delete/copy/cut/paste itself and `EditorHotkeys.save` emits on `ctrl+s`.

Without `[packages]`, the palette shows the packages selected in the package manager. Use `withPackageManager('STORAGE_NAME')` to remember that selection. A full editor page is in the [Layout editor](#layout-editor-1) sample.

## Relations

### How relations work

Relations are a directed graph. Each node has an `id`, *inputs* (plain public properties) and *outputs* (properties decorated with `@DynamicOutput()`). An edge connects an output of one node to an input of another. When an output value changes, it's assigned to all connected inputs, then the target's `dynamicOnChanges(changes)` and `invalidateVisuals()` are called.

Relations need `withRelationsRuntime()` (or `withLayoutRelationsRuntime()` for layouts) and the metadata set with `RelationsManager.setRelations(relations)` in the same injector scope.

### Relations metadata

Edges are stored on the *source* node: `outputs[].inputs[] = {id: <target node id>, inputName: <target property>}`.

| Node | `package` | `name` | `id` |
| --- | --- | --- | --- |
| Layout component | `'layout-components'` | layout `id` | layout `id` |
| Pure relations node | package of the node | item name | any unique id |
| Static (template) component | `'static-components'` | relations id of the component | relations id of the component |

`relationsOptions` are passed to `relationsOptions` of the node. A full example is in [Layout with relations](#layout-with-relations).

### Data propagation

| Mechanism | Description |
| --- | --- |
| `@DynamicOutput()` | Default: changes are collected by `RelationsChangeDetector` and delivered asynchronously in one batch; all inputs of a target changed in a batch arrive in one `dynamicOnChanges` call |
| `@DynamicOutput({sync: true})` | Value is transferred immediately when assigned |
| `@DynamicOutput({skipInit: true})` | No initial transfer when relations are initialized, only real changes propagate (events like `click`) |
| Initial transfer | When relations are (re)initialized, outputs that were assigned at least once send their current value; the order in which components register doesn't matter |
| Equality check | A transfer is skipped when the new value is strictly equal to the previous one |
| `RelationsChangeDetectorOptions(detectionInSingleRun)` | Default `true`; with `false`, changes made during a run are delivered in the next run |

### Kinds of relations nodes

| Kind | How | Sample |
| --- | --- | --- |
| **Pure relations node** | Plain class with `@PureRelationsComponent()`, implements `RelationsComponent`, constructor `(injector: Injector)`, created by the runtime from metadata | [Pure relations node](#pure-relations-node) |
| **Layout + relations component** | Layout component implementing `RelationsComponent`, with `RelationsRegistrationExtension` in `type.ts`; `@PureRelationsComponent()` must not be used on it | [Component that is both layout and relations](#component-that-is-both-layout-and-relations) |
| **Static component** | Angular component in your own template that registers itself in `RelationsComponentManager` and `RelationsProcessor` | [Static components in relations](#static-components-in-relations) |

Optional members of `RelationsComponent`: `dynamicOnChanges(changes)` and `relationsOnDestroy()` (called for nodes created by the runtime when they are destroyed). Relations editor metadata (`@RelationsEditorMetadata(loader)`, `RelationsEditorMetadataDescriptor` with `metaInfo` and `nodeDefinition`) makes a node available in the relations editor. The node component extends `RelationsNodeBase` and uses `<relations-node-header>`, `<relation-node-input>` and `<relation-node-output>`. The `name` of an input/output element must equal the runtime property name.

### Relations editor

`<relations-editor>` (`RelationsEditorComponent`, needs `withRelationsEditor()` or `withLayoutRelationsEditor()` and `withPackageManager()`):

| Input | Type | Description |
| --- | --- | --- |
| `metadata` | `RelationsNodeMetadata[]` | Edited relations; setting it resets history |
| `packages` | `string[] \| undefined \| null` | Packages shown in the palette; when set, the package manager UI is hidden |
| `whiteList` | `DynamicItemSource[] \| undefined \| null` | Only these items of the listed packages are shown |
| `blackList` | `DynamicItemSource[] \| undefined \| null` | Items hidden from the palette |

Read the result with `EDITOR_METADATA_MANAGER.getMetadata()`, history is available under `RELATIONS_HISTORY_MANAGER`. With `withLayoutRelationsEditor()`, pass the layout to `LayoutManager.setLayout(layout)` so its relations-capable components appear as nodes. See the [Relations editor](#relations-editor-1) sample.

### Relations debugger

`@anglr/dynamic/relations-debugger` is **experimental**. It records registrations and data transfers of the relations runtime and replays them step by step on a canvas (`ShowRelationsDebuggerDirective` – `[showRelationsDebugger]` with `relationsDefinition`). It's enabled by `provideRelationsDebugger()` (`@anglr/dynamic/relations`) together with `provideRelationsDebuggerImplementation()` (`@anglr/dynamic/relations-debugger`). `@DebugData({inputs, outputs})` describes endpoints of a node for the debugger.

The debugger hooks run only when the build-time global `ngRelationsDebugger` is explicitly defined as `true` (`define` option of the Angular build, see [Project setup](#project-setup)). Without it, the relations runtime skips all debugger hooks and the debugger has nothing to show.

## Extensibility

| Extension point | What you can do | How to register |
| --- | --- | --- |
| `DynamicModuleProvider` | Load items of your own package, or from any other source (generated, remote) | Multi tokens `LAYOUT_COMPONENTS_MODULE_PROVIDERS`, `LAYOUT_MODULE_TYPES_PROVIDERS`, `RELATIONS_COMPONENTS_MODULE_PROVIDERS`, `RELATIONS_MODULE_TYPES_PROVIDERS`, `RELATIONS_NODES_PROVIDERS`, usually from a `DynamicFeature` |
| `DynamicFeature` | Bundle providers per scope (`layoutRuntime`, `layoutEditor`, `relationsRuntime`, `relationsEditor`, each `{prependProviders, providers}`) | Pass to `provideDynamic()` |
| `DynamicModuleDataExtractor`, `DynamicModuleDataExtractorFn` | Support other export conventions of item modules (built-in fns `defaultExportExtractor`, `extensionsExportsExtractor`) | Multi tokens `*_DATA_EXTRACTORS` |
| `DynamicItemLoader` | Replace the whole loading of a kind of items | Tokens `LAYOUT_COMPONENTS_LOADER`, `RELATIONS_COMPONENTS_LOADER`, `LAYOUT_MODULE_TYPES_LOADER`, `RELATIONS_MODULE_TYPES_LOADER`, `RELATIONS_NODES_LOADER` |
| `DynamicItemExtensionBase` | Reusable behavior attached to items | `extensions` / `childExtensions` export of `type.ts` |
| `PackageSource` | Provide the list of available packages (`packages`, `packagesChange`, `refresh()`) | Multi token `PACKAGE_SOURCES`; `provideStaticPackageSource(name)` for a fixed package |
| `PackageManager` | Control which packages are used in editors | `withPackageManager(storageName \| Type \| factoryFn(…))` |
| `MetadataStorage<TMetadata>` | Load layouts/relations by id (`getMetadata(id)`) for `templateBlock` and custom components | `withLayoutMetadataStorage()`, `withRelationsMetadataStorage()` |
| `DefaultsOverride` | Default options and display names of dropped items | `withLayoutDefaultsOverride()`, `withRelationsDefaultsOverride()` |
| `MetadataHistoryManager` | Undo/redo history of editors | Tokens `LAYOUT_HISTORY_MANAGER`, `RELATIONS_HISTORY_MANAGER` |
| `LayoutRenderer` | Override `createComponent`, `postCreateComponent`, `postInitComponent` | Provide your subclass as `LayoutRenderer` |
| `LayoutRendererOptions` | Behavior for missing components | Provide an instance |
| `PropertiesControlBase` | Custom block of the properties editor | `getPropertiesControl(type)` in `propertiesControls` |
| Properties control tokens | Replace any properties control (built-in or own) everywhere it's used | `{provide: ExistingControlComponent, useValue: MyControlComponent}` next to `provideDynamic()` |
| `PropertyTypeControlBase` | Custom property type | `LAYOUT_EDITOR_PROPERTY_TYPE_CONTROLS` |
| `@LayoutEditorDesignerType(loader)` | Render a different component for an item inside the layout editor | Decorator on the component class |
| `StaticComponentsRegister` | Template components as relations editor nodes | `withStaticComponents()` |
| `CustomComponentsRegister`, `CustomRelationsRegister` | Reusable stored layouts / relations | `withCustomComponents()`, `withCustomRelations()` |
| `REFRESH_PALETTE_OBSERVABLES` | Refresh the palette when your data change | Multi token, or the refresh arguments of `withCustomComponents()` / `withCustomRelations()` |

The full worked example of the main extension point – an own package with layout components, a layout + relations component and a pure relations node – is the [⭐ Creating your own package of dynamic items](#-creating-your-own-package-of-dynamic-items) sample, together with the item samples that follow it.

## Styling

### Setup

`@anglr/dynamic/styles` exports:

| Member | Description |
| --- | --- |
| `defineTheme($colors, $font)` | Function, merges colors with the default theme |
| `buildThemeColors($theme)` | Mixin, emits `--dynamic-*` CSS custom properties |
| `buildThemeCss` | Mixin, emits CSS of the editors and built-in components (`.btn` variants, gap/margin/padding utilities, thin scrollbar) |
| `buildTheme($theme)` | Mixin, `buildThemeColors($theme)` + `buildThemeCss` |

A theme is defined from a theme file (here inside a `@use … with (…)` theme configuration of the application):

```scss
@use '@anglr/dynamic/styles/themes/dark' as dynamicTheme;
```

```scss
                              $dynamicTheme: dynamicTheme.defineTheme(),
```

Colors are emitted inside the theme selector of the application:

```scss
@use '@anglr/dynamic/styles' as dynamic;
```

```scss
$dynamicTheme: null !default;
```

```scss
    @include dynamic.buildThemeColors($dynamicTheme);
```

CSS is emitted once for the page:

```scss
@use '@anglr/dynamic/styles' as dynamic;
```

```scss
    @include dynamic.buildThemeCss;
```

### Themes

`@anglr/dynamic/styles/themes/dark` and `@anglr/dynamic/styles/themes/light` export `defineTheme($colors: (), $font: 'Inter')`. Pass a partial map to change colors, the keys follow the theme map (`btnPrimary`, `btnInfo`, `btnSuccess`, `btnDanger`, `btnIcon`, `formControl`, `scrollbar`, `dragPlaceholder`, `dropzoneOverlay`, `layoutDesigner`, `propertiesEditor`, `relationsCanvas`, `componentsPalette`, `componentsTree`, `componentsTreeItem`, `layoutEditorDragPreview`, `nodesPalette`, `relationNodeEndpoint`, `packageManager`, `notFoundNode`, `placeholder`, `contentOptions`, `relationsDebuggerVisualizer`, `relationsDebuggerTooltip`, `dataTableDesigner`).

### CSS custom properties

The most important variables (all emitted by `buildThemeColors`):

| Variable | Description |
| --- | --- |
| `--dynamic-font-family` | Font of editors |
| `--dynamic-btn-primary-background`, `-foreground`, `-border` | Primary button (also `info`, `success`, `danger` variants) |
| `--dynamic-btn-icon-foreground` | Icon buttons |
| `--dynamic-form-control-foreground`, `-background`, `-border` | Form controls |
| `--dynamic-thin-scrollbar` | Scrollbar color |
| `--dynamic-drag-placeholder` | Drop placeholder in layout editor |
| `--dynamic-layoutDesigner-overlay-border` | Border of selected/highlighted component in layout editor |
| `--dynamic-layoutDesigner-title-background`, `-foreground` | Title of selected component in layout editor |
| `--dynamic-properties-editor-properties-main-background`, `-border` | Properties editor panel |
| `--dynamic-components-palette-editor-component-background`, `-border` | Items of the layout palette |
| `--dynamic-components-tree-background`, `-border` | Component tree |
| `--dynamic-relations-canvas-background` | Relations editor canvas |
| `--dynamic-relations-canvas-relations-node-header-background`, `-foreground` | Header of relations nodes |
| `--dynamic-relations-canvas-relations-node-content-background` | Content of relations nodes |
| `--dynamic-relation-node-endpoint-background` | Input/output endpoints of nodes |
| `--dynamic-nodes-palette-editor-component-background`, `-border` | Items of the relations palette |
| `--dynamic-placeholder-foreground`, `-background` | Placeholders |

## Samples

Each sample is a standalone component; data files (`*.data.ts`) contain the metadata that an application usually loads from a server. Samples are listed from the most important. The layout from [Quick Start](#quick-start) is the simplest one.

### Layout with relations

Connect layout components with relations: the toggle button shows and hides details (`toggle` → `ifBlock.condition`) and, through the built-in `negation` node, enables the save button (`toggle` → `negation.condition`, `negatedCondition` → `button.disabled`). Layout components are referenced in relations with package `layout-components` and their layout id. Every input target has its own entry, even without outputs.

```ts
import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {RelationsManager} from '@anglr/dynamic/relations';
import {withLayoutRelationsRuntime} from '@anglr/dynamic/layout-relations';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {layoutRelationsLayout, layoutRelationsRelations} from './layoutRelations.data';

/**
 * Renders layout and connects its components using relations
 */
@Component(
{
    selector: 'layout-relations-sample',
    templateUrl: 'layoutRelations.component.html',
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    providers:
    [
        provideDynamic(withLayoutRelationsRuntime(),
                       withBasicComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutRelationsComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Layout metadata to be rendered
     */
    protected metadata: LayoutComponentMetadata = layoutRelationsLayout;

    //######################### constructor #########################
    constructor()
    {
        inject(RelationsManager).setRelations(layoutRelationsRelations);
    }
}
```

```html
<ng-container *layoutComponentRenderer="metadata"/>
```

```ts
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {RelationsComponentMetadata} from '@anglr/dynamic/relations';

/**
 * Layout metadata of layout with relations sample
 */
export const layoutRelationsLayout: LayoutComponentMetadata =
{
    id: 'stackPanel-root',
    displayName: 'root',
    package: 'basic-components',
    name: 'stackPanel',
    options:
    {
        children:
        [
            {
                id: 'toggleButton-show',
                displayName: 'show details',
                package: 'basic-components',
                name: 'toggleButton',
                options:
                {
                    onText: 'Hide details',
                    offText: 'Show details',
                    state: false,
                    buttonCssClass: 'btn btn-primary',
                },
            },
            {
                id: 'ifBlock-details',
                displayName: 'details',
                package: 'basic-components',
                name: 'ifBlock',
                options:
                {
                    condition: false,
                    content:
                    {
                        id: 'textBlock-details',
                        package: 'basic-components',
                        name: 'textBlock',
                        options:
                        {
                            text: 'Details are visible only when toggle button is on',
                        },
                    },
                },
            },
            {
                id: 'button-save',
                displayName: 'save',
                package: 'basic-components',
                name: 'button',
                options:
                {
                    text: 'Save (enabled when details are visible)',
                    buttonCssClass: 'btn btn-primary',
                    type: 'button',
                    disabled: true,
                },
            },
        ],
    },
};

/**
 * Relations metadata of layout with relations sample, layout components are referenced by their id
 */
export const layoutRelationsRelations: RelationsComponentMetadata[] =
[
    {
        id: 'toggleButton-show',
        package: 'layout-components',
        name: 'toggleButton-show',
        relationsOptions: null,
        outputs:
        [
            {
                outputName: 'toggle',
                inputs:
                [
                    {id: 'ifBlock-details', inputName: 'condition'},
                    {id: 'negation-save', inputName: 'condition'},
                ],
            },
        ],
    },
    {
        id: 'negation-save',
        package: 'basic-components',
        name: 'negation',
        relationsOptions: null,
        outputs:
        [
            {
                outputName: 'negatedCondition',
                inputs:
                [
                    {id: 'button-save', inputName: 'disabled'},
                ],
            },
        ],
    },
    {
        id: 'ifBlock-details',
        package: 'layout-components',
        name: 'ifBlock-details',
        relationsOptions: null,
    },
    {
        id: 'button-save',
        package: 'layout-components',
        name: 'button-save',
        relationsOptions: null,
    },
];
```

### ⭐ Creating your own package of dynamic items

> **Recommended.** Every application that goes beyond the built-in components needs its own package. Doing it the same way as the built-in packages gives you lazy loading of each item, editor metadata that is loaded only by editors, palette lists for both editors and one `with…()` function that works for runtime pages and editors alike.

The package `my-components` contains three layout components (`badge`, `counter`, `infoCard`) and one pure relations node (`concat`). The items themselves are shown in the samples that follow. Structure:

```text
myComponents/
  dynamicItems/
    badge/       (layout component with custom properties control)
    concat/      (pure relations node)
    counter/     (layout + relations component)
    infoCard/    (layout container)
  services/
    index.ts
    myDynamicModuleItemsProvider.service.ts
    myDynamicModuleRelationsProvider.service.ts
    myDynamicModuleTypesProvider.service.ts
  features.ts
  index.ts
  relations.ts
  types.ts
```

`types.ts` and `relations.ts` list the items offered in the palettes:

```ts
/**
 * Names of layout components available in palette of layout editor
 */
const components =
[
    'badge',
    'counter',
    'infoCard',
];

export default components;
```

```ts
/**
 * Names of relations nodes available in palette of relations editor (layout components are not listed here)
 */
const relations =
[
    'concat',
];

export default relations;
```

The items provider returns the `type.ts` module of the requested item. An explicit name → loader map keeps every item in its own lazy chunk and is resolved reliably by the bundler:

```ts
import {Injectable} from '@angular/core';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

/**
 * Lazy loaders of all dynamic items in 'my-components' package, key is name of item
 */
const items: Record<string, () => Promise<DynamicModule>> =
{
    badge: () => import('../dynamicItems/badge/type'),
    concat: () => import('../dynamicItems/concat/type'),
    counter: () => import('../dynamicItems/counter/type'),
    infoCard: () => import('../dynamicItems/infoCard/type'),
};

/**
 * Dynamic module items provider for 'my-components' package, returns module of requested item
 */
@Injectable()
export class MyDynamicModuleItemsProvider implements DynamicModuleProvider
{
    //######################### public methods - implementation of DynamicModuleProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<DynamicModule|null>
    {
        if(source.package != 'my-components')
        {
            return null;
        }

        return await items[source.name]?.() ?? null;
    }
}
```

The types and relations providers return the palette lists:

```ts
import {Injectable} from '@angular/core';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

/**
 * Dynamic module types provider for 'my-components' package, returns list of layout components
 */
@Injectable()
export class MyDynamicModuleTypesProvider implements DynamicModuleProvider
{
    //######################### public methods - implementation of DynamicModuleProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<DynamicModule|null>
    {
        if(source.package != 'my-components')
        {
            return null;
        }

        return await import('../types');
    }
}
```

```ts
import {Injectable} from '@angular/core';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

/**
 * Dynamic module relations provider for 'my-components' package, returns list of relations nodes
 */
@Injectable()
export class MyDynamicModuleRelationsProvider implements DynamicModuleProvider
{
    //######################### public methods - implementation of DynamicModuleProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<DynamicModule|null>
    {
        if(source.package != 'my-components')
        {
            return null;
        }

        return await import('../relations');
    }
}
```

`services/index.ts`:

```ts
export * from './myDynamicModuleItemsProvider.service';
export * from './myDynamicModuleRelationsProvider.service';
export * from './myDynamicModuleTypesProvider.service';
```

The feature registers each provider for the scope where it's needed. `provideStaticPackageSource()` adds the package to the package manager of the editors:

```ts
import {ClassProvider} from '@angular/core';
import {DynamicFeature, provideStaticPackageSource} from '@anglr/dynamic';
import {LAYOUT_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/layout';
import {LAYOUT_MODULE_TYPES_PROVIDERS} from '@anglr/dynamic/layout-editor';
import {RELATIONS_COMPONENTS_MODULE_PROVIDERS} from '@anglr/dynamic/relations';
import {RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';

import {MyDynamicModuleItemsProvider, MyDynamicModuleRelationsProvider, MyDynamicModuleTypesProvider} from './services';

/**
 * Enables use of 'my-components' package, works for runtime and editors (only relevant providers are used)
 */
export function withMyComponents(): DynamicFeature
{
    return new DynamicFeature(
    {
        //rendering of layout components
        layoutRuntime:
        {
            prependProviders: [],
            providers:
            [
                <ClassProvider>{provide: LAYOUT_COMPONENTS_MODULE_PROVIDERS, useClass: MyDynamicModuleItemsProvider, multi: true},
            ],
        },
        //palette of layout editor
        layoutEditor:
        {
            prependProviders: [],
            providers:
            [
                <ClassProvider>{provide: LAYOUT_MODULE_TYPES_PROVIDERS, useClass: MyDynamicModuleTypesProvider, multi: true},
                provideStaticPackageSource('my-components'),
            ],
        },
        //creating pure relations components
        relationsRuntime:
        {
            prependProviders: [],
            providers:
            [
                <ClassProvider>{provide: RELATIONS_COMPONENTS_MODULE_PROVIDERS, useClass: MyDynamicModuleItemsProvider, multi: true},
            ],
        },
        //palette and nodes of relations editor
        relationsEditor:
        {
            prependProviders: [],
            providers:
            [
                <ClassProvider>{provide: RELATIONS_MODULE_TYPES_PROVIDERS, useClass: MyDynamicModuleRelationsProvider, multi: true},
                <ClassProvider>{provide: RELATIONS_NODES_PROVIDERS, useClass: MyDynamicModuleItemsProvider, multi: true},
                provideStaticPackageSource('my-components'),
            ],
        },
    });
}
```

`index.ts` exports options interfaces and the feature:

```ts
export * from './dynamicItems/badge/badge.options';
export * from './dynamicItems/concat/concat.options';
export * from './dynamicItems/counter/counter.options';
export * from './dynamicItems/infoCard/infoCard.options';
export * from './features';
```

Using the package is one more feature in `provideDynamic()`:

```ts
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata, LayoutComponentRendererDirective, withLayoutRuntime} from '@anglr/dynamic/layout';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {withMyComponents} from './myComponents';
import {ownPackageLayout} from './ownPackage.data';

/**
 * Renders layout that uses items from own package 'my-components'
 */
@Component(
{
    selector: 'own-package-sample',
    templateUrl: 'ownPackage.component.html',
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    providers:
    [
        provideDynamic(withLayoutRuntime(),
                       withBasicComponents(),
                       withMyComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OwnPackageComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Layout metadata to be rendered
     */
    protected metadata: LayoutComponentMetadata = ownPackageLayout;
}
```

```html
<ng-container *layoutComponentRenderer="metadata"/>
```

Items of different packages can be mixed freely in one layout:

```ts
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Layout metadata using items from 'my-components' package together with 'basic-components'
 */
export const ownPackageLayout: LayoutComponentMetadata =
{
    id: 'stackPanel-root',
    displayName: 'root',
    package: 'basic-components',
    name: 'stackPanel',
    options:
    {
        children:
        [
            {
                id: 'infoCard-welcome',
                package: 'my-components',
                name: 'infoCard',
                options:
                {
                    title: 'Welcome',
                    text: 'This card comes from own package of dynamic items',
                    content:
                    {
                        id: 'stackPanel-content',
                        package: 'basic-components',
                        name: 'stackPanel',
                        options:
                        {
                            horizontal: true,
                            children:
                            [
                                {
                                    id: 'badge-new',
                                    package: 'my-components',
                                    name: 'badge',
                                    options:
                                    {
                                        text: 'New',
                                        color: '#2e7d32',
                                    },
                                },
                                {
                                    id: 'counter-clicks',
                                    package: 'my-components',
                                    name: 'counter',
                                    options:
                                    {
                                        label: 'Clicks',
                                        step: 1,
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        ],
    },
};
```

### Custom layout component with editable properties

`infoCard` is a layout container with one child. It shows all parts of a layout component: options interface, component based on `LayoutComponentBase`, `@DescendantsGetter` for the child, lazily loaded editor metadata (palette info, properties, default options and child handling), a decorated model for the properties editor and `type.ts` with `ComponentStylingExtension`, so CSS class, margin and padding can be edited as well.

`infoCard.options.ts`:

```ts
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Options for info card component
 */
export interface InfoCardComponentOptions
{
    /**
     * Title displayed in header of card
     */
    title: string|undefined|null;

    /**
     * Text displayed below title
     */
    text: string|undefined|null;

    /**
     * Metadata of component rendered as content of card
     */
    content: LayoutComponentMetadata|undefined|null;
}
```

`infoCard.component.ts` and `infoCard.component.html`:

```ts
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {HostDisplayBlockStyle} from '@anglr/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

import {InfoCardComponentOptions} from './infoCard.options';
import {InfoCardLayoutMetadataLoader} from './infoCard.metadata';

/**
 * Component used for displaying card with title, text and optional content
 */
@Component(
{
    selector: 'info-card',
    templateUrl: 'infoCard.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<InfoCardComponentOptions>(options => options?.content ? [options.content] : [])
@LayoutEditorMetadata(InfoCardLayoutMetadataLoader)
export class InfoCardComponent extends LayoutComponentBase<InfoCardComponentOptions> implements LayoutComponent<InfoCardComponentOptions>
{
}
```

```html
<div class="info-card">
    <h3>{{options?.title}}</h3>
    <p>{{options?.text}}</p>

    <div class="info-card-content">
        <ng-container *layoutComponentRenderer="options?.content"/>
    </div>
</div>
```

`infoCard.metadata.ts` – the editor metadata is a separate lazy chunk:

```ts
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {InfoCardComponentOptions} from './infoCard.options';

/**
 * Info card layout metadata loader, editor metadata are loaded lazily only when needed
 */
export const InfoCardLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<InfoCardComponentOptions>> = async () => new (await import('./metadata/infoCard.layoutMetadata')).InfoCardLayoutEditorMetadata();
```

`metadata/infoCard.layoutMetadata.ts`:

```ts
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, getPropertiesControl, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Action, Func} from '@jscrpt/common';

import {InfoCardComponentOptions} from '../infoCard.options';
import {InfoCardModel} from './infoCard.model';

/**
 * Info card layout editor metadata
 */
export class InfoCardLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<InfoCardComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<InfoCardComponentOptions> =
    {
        name: 'Info card',
        description: 'Card with title, text and one child component',
        group: 'My components',
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: ComponentStylingModel,
                    propertiesControls:
                    [
                        getPropertiesControl(ComponentStylingPropertiesControlComponent),
                    ],
                },
                {
                    modelType: InfoCardModel,
                    propertiesControls:
                    [
                        genericPropertiesControlFor<InfoCardModel>(['title', 'text']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            title: 'Card title',
            text: 'Card text',
        },
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, InfoCardComponentOptions, number]> = (metadata, options) =>
    {
        options.content = metadata;
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [InfoCardComponentOptions|undefined|null]> = options => !options?.content;

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, InfoCardComponentOptions]> = (_id, options) =>
    {
        options.content = null;
    };

    /**
     * @inheritdoc
     */
    public getChildrenContainer?: Func<Element|null, [Element]> = element => element.querySelector('.info-card-content');

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}
```

`metadata/infoCard.model.ts`:

```ts
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {DefaultKnownPropertyTypes, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {InfoCardComponentOptions} from '../infoCard.options';

/**
 * Info card model for properties editor
 */
export class InfoCardModel implements InfoCardComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Title')
    @LayoutPropertyDescription('Title displayed in header of card')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public title: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Text')
    @LayoutPropertyDescription('Text displayed below title')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('textarea')
    public text: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    public content: LayoutComponentMetadata|undefined|null;

    //######################### constructor #########################
    constructor(value: InfoCardComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}
```

`type.ts`:

```ts
import {ComponentStylingExtension} from '@anglr/dynamic/layout';

import {InfoCardComponent} from './infoCard.component';

export default InfoCardComponent;

export const extensions = [ComponentStylingExtension];
```

To try the properties, open the card in the layout editor:

```ts
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorComponent, withLayoutEditor} from '@anglr/dynamic/layout-editor';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {withMyComponents} from '../ownPackage/myComponents';
import {customLayoutComponentLayout} from './customLayoutComponent.data';

/**
 * Displays custom layout component 'infoCard' in layout editor, so its properties can be edited
 */
@Component(
{
    selector: 'custom-layout-component-sample',
    templateUrl: 'customLayoutComponent.component.html',
    host:
    {
        class: 'flex-column',
        style: 'height: 80vh',
    },
    imports:
    [
        LayoutEditorComponent,
    ],
    providers:
    [
        provideDynamic(withLayoutEditor(),
                       withBasicComponents(),
                       withMyComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomLayoutComponentComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Layout metadata to be edited
     */
    protected metadata: LayoutComponentMetadata = customLayoutComponentLayout;
}
```

```html
<layout-editor class="flex-1" [metadata]="metadata" [packages]="['basic-components', 'my-components']"/>
```

### Component that is both layout and relations

`counter` is rendered by the layout and takes part in relations: input `value` (relations data arrive in `onChanges`), output `count` (`@DynamicOutput()`). `RelationsRegistrationExtension` in `type.ts` registers it under its layout id. It has editor metadata for both editors and a node component for the relations editor. Because rendered components are detached from change detection, `increment()` calls `invalidateVisuals()`. Here the `count` of one counter sets the `value` of another.

`counter.options.ts`:

```ts
/**
 * Options for counter component
 */
export interface CounterComponentOptions
{
    /**
     * Label displayed next to current count
     */
    label: string|undefined|null;

    /**
     * Value added to count on each click
     */
    step: number|undefined|null;
}
```

`counter.component.ts` and `counter.component.html`:

```ts
import {Component, ChangeDetectionStrategy, Input, SimpleChanges} from '@angular/core';
import {HostDisplayBlockStyle} from '@anglr/common';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {DynamicOutput, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {CounterComponentOptions} from './counter.options';
import {CounterLayoutMetadataLoader, CounterRelationsMetadataLoader} from './counter.metadata';

/**
 * Component displaying counter, it is layout component and also relations component
 */
@Component(
{
    selector: 'counter',
    templateUrl: 'counter.component.html',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(CounterRelationsMetadataLoader)
@LayoutEditorMetadata(CounterLayoutMetadataLoader)
export class CounterComponent extends LayoutComponentBase<CounterComponentOptions> implements LayoutComponent<CounterComponentOptions>, RelationsComponent
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: unknown;

    //######################### public properties - inputs #########################

    /**
     * Value that replaces current count, set by relations
     */
    @Input()
    public value: number|undefined|null;

    //######################### public properties - dynamic outputs #########################

    /**
     * Current count, transfered by relations to connected inputs
     */
    @DynamicOutput()
    public count: number = 0;

    //######################### protected methods - template bindings #########################

    /**
     * Increments count by step, layout components are detached from change detection, so view must be invalidated
     */
    protected increment(): void
    {
        this.count += this.options?.step ?? 1;
        this.invalidateVisuals();
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onChanges(changes: SimpleChanges): void
    {
        if(nameof<CounterComponent>('value') in changes)
        {
            this.count = this.value ?? 0;
        }
    }
}
```

```html
<div class="flex-row flex-center-vertical gap-small">
    <span>{{options?.label}}: {{count}}</span>
    <button type="button" class="btn btn-primary" (click)="increment()">+{{options?.step ?? 1}}</button>
</div>
```

`counter.metadata.ts`:

```ts
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {CounterComponentOptions} from './counter.options';

/**
 * Counter layout metadata loader
 */
export const CounterLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<CounterComponentOptions>> = async () => new (await import('./metadata/counter.layoutMetadata')).CounterLayoutEditorMetadata();

/**
 * Counter relations metadata loader
 */
export const CounterRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/counter.relationsMetadata')).CounterRelationsEditorMetadata();
```

`metadata/counter.layoutMetadata.ts`:

```ts
import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, getPropertiesControl, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {CounterComponentOptions} from '../counter.options';
import {CounterModel} from './counter.model';

/**
 * Counter layout editor metadata
 */
export class CounterLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<CounterComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<CounterComponentOptions> =
    {
        name: 'Counter',
        description: 'Counts clicks, count is available in relations',
        group: 'My components',
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: ComponentStylingModel,
                    propertiesControls:
                    [
                        getPropertiesControl(ComponentStylingPropertiesControlComponent),
                    ],
                },
                {
                    modelType: CounterModel,
                    propertiesControls:
                    [
                        genericPropertiesControlFor<CounterModel>(['label', 'step']),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            label: 'Count',
            step: 1,
        },
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}
```

`metadata/counter.model.ts` is shown in [Options interface and model](#options-interface-and-model).

`metadata/counter.relationsMetadata.ts`:

```ts
import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {CounterNodeComponent} from '../node/counterNode.component';

/**
 * Counter relations editor metadata
 */
export class CounterRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Counter',
        description: 'Counts clicks',
        group: 'My components',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = CounterNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}
```

`node/counterNode.component.ts` and `node/counterNode.component.html` – the `name` attributes match the runtime properties `value` and `count`:

```ts
import {Component} from '@angular/core';
import {RelationNodeInputComponent, RelationNodeOutputComponent, RelationsNode, RelationsNodeBase, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations editor node for counter
 */
@Component(
{
    selector: 'counter-node',
    templateUrl: 'counterNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
    ],
})
export class CounterNodeComponent extends RelationsNodeBase implements RelationsNode
{
}
```

```html
<relations-node-header [parent]="this" [destroySubject]="destroySubject"/>

<div class="node-content">
    <div class="inputs-outputs">
        <div class="inputs">
            <div class="input">
                <relation-node-input [parentCoordiantes]="nodePosition" [zoomLevel]="zoomLevel" name="value" [parent]="this"/>
                <div>Value</div>
            </div>
        </div>

        <div class="outputs">
            <div class="output">
                <div>Count</div>
                <relation-node-output [parentCoordiantes]="nodePosition" [zoomLevel]="zoomLevel" name="count" [parent]="this"/>
            </div>
        </div>
    </div>
</div>
```

`type.ts`:

```ts
import {ComponentStylingExtension} from '@anglr/dynamic/layout';
import {RelationsRegistrationExtension} from '@anglr/dynamic/relations';

import {CounterComponent} from './counter.component';

export default CounterComponent;

export const extensions = [ComponentStylingExtension, RelationsRegistrationExtension];
```

Page and metadata:

```ts
import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {RelationsManager} from '@anglr/dynamic/relations';
import {withLayoutRelationsRuntime} from '@anglr/dynamic/layout-relations';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {withMyComponents} from '../ownPackage/myComponents';
import {layoutRelationsComponentLayout, layoutRelationsComponentRelations} from './layoutRelationsComponent.data';

/**
 * Renders custom layout components that are also relations components
 */
@Component(
{
    selector: 'layout-relations-component-sample',
    templateUrl: 'layoutRelationsComponent.component.html',
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    providers:
    [
        provideDynamic(withLayoutRelationsRuntime(),
                       withBasicComponents(),
                       withMyComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutRelationsComponentComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Layout metadata to be rendered
     */
    protected metadata: LayoutComponentMetadata = layoutRelationsComponentLayout;

    //######################### constructor #########################
    constructor()
    {
        inject(RelationsManager).setRelations(layoutRelationsComponentRelations);
    }
}
```

```html
<ng-container *layoutComponentRenderer="metadata"/>
```

```ts
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {RelationsComponentMetadata} from '@anglr/dynamic/relations';

/**
 * Layout metadata with two counters
 */
export const layoutRelationsComponentLayout: LayoutComponentMetadata =
{
    id: 'stackPanel-root',
    displayName: 'root',
    package: 'basic-components',
    name: 'stackPanel',
    options:
    {
        children:
        [
            {
                id: 'counter-source',
                package: 'my-components',
                name: 'counter',
                options:
                {
                    label: 'Source',
                    step: 1,
                },
            },
            {
                id: 'counter-target',
                package: 'my-components',
                name: 'counter',
                options:
                {
                    label: 'Target (value set from source)',
                    step: 10,
                },
            },
        ],
    },
};

/**
 * Relations metadata, output 'count' of source counter is connected to input 'value' of target counter
 */
export const layoutRelationsComponentRelations: RelationsComponentMetadata[] =
[
    {
        id: 'counter-source',
        package: 'layout-components',
        name: 'counter-source',
        relationsOptions: null,
        outputs:
        [
            {
                outputName: 'count',
                inputs:
                [
                    {id: 'counter-target', inputName: 'value'},
                ],
            },
        ],
    },
    {
        id: 'counter-target',
        package: 'layout-components',
        name: 'counter-target',
        relationsOptions: null,
    },
];
```

### Pure relations node

`concat` is a non-visual node: a plain class with `@PureRelationsComponent()`, created by the relations runtime from metadata with an `Injector`, configured by `relationsOptions`. Its inputs are plain properties, its output uses `@DynamicOutput()`. Here it joins the counts of two counters and sends the text to a built-in `htmlBlock`.

`concat.options.ts`:

```ts
/**
 * Options for concat relations
 */
export interface ConcatRelationsOptions
{
    /**
     * Separator placed between joined texts
     */
    separator: string|undefined|null;
}
```

`concat.relations.ts`:

```ts
import {Injector, SimpleChanges} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {ConcatRelationsOptions} from './concat.options';
import {ConcatRelationsMetadataLoader} from './concat.metadata';

/**
 * Pure relations component (no visual) that joins two texts
 */
@PureRelationsComponent()
@RelationsEditorMetadata(ConcatRelationsMetadataLoader)
export class ConcatRelations implements RelationsComponent<ConcatRelationsOptions>
{
    //######################### protected fields #########################

    /**
     * Instance of logger
     */
    protected logger: Logger;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: ConcatRelationsOptions|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * First text to be joined
     */
    public first: unknown;

    /**
     * Second text to be joined
     */
    public second: unknown;

    //######################### public properties - dynamic outputs #########################

    /**
     * Joined texts
     */
    @DynamicOutput()
    public result: string|undefined|null;

    //######################### constructor #########################
    constructor(injector: Injector)
    {
        this.logger = injector.get(LOGGER);
    }

    //######################### public methods - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public dynamicOnChanges(changes: SimpleChanges): void
    {
        if(nameof<ConcatRelations>('first') in changes || nameof<ConcatRelations>('second') in changes)
        {
            this.result = [this.first, this.second].filter(itm => itm != null && itm !== '')
                                                    .join(this.relationsOptions?.separator ?? ' ');
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }

    /**
     * @inheritdoc
     */
    public relationsOnDestroy(): void
    {
        this.logger.debug('ConcatRelations: destroyed');
    }
}
```

`concat.metadata.ts` and `metadata/concat.relationsMetadata.ts` – `defaultOptions` are the `relationsOptions` of a node dropped from the palette:

```ts
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {ConcatRelationsOptions} from './concat.options';

/**
 * Concat relations metadata loader
 */
export const ConcatRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor<ConcatRelationsOptions>> = async () => new (await import('./metadata/concat.relationsMetadata')).ConcatRelationsEditorMetadata();
```

```ts
import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {ConcatRelationsOptions} from '../concat.options';
import {ConcatNodeComponent} from '../node/concatNode.component';

/**
 * Concat relations editor metadata
 */
export class ConcatRelationsEditorMetadata implements RelationsEditorMetadataDescriptor<ConcatRelationsOptions>
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo<ConcatRelationsOptions> =
    {
        name: 'Concat',
        description: 'Joins two texts using separator',
        group: 'My components',
        defaultOptions:
        {
            separator: ' ',
        },
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode<ConcatRelationsOptions>> = ConcatNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}
```

`node/concatNode.component.ts` and `node/concatNode.component.html`:

```ts
import {Component} from '@angular/core';
import {RelationNodeInputComponent, RelationNodeOutputComponent, RelationsNode, RelationsNodeBase, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

import {ConcatRelationsOptions} from '../concat.options';

/**
 * Relations editor node for concat
 */
@Component(
{
    selector: 'concat-node',
    templateUrl: 'concatNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
    ],
})
export class ConcatNodeComponent extends RelationsNodeBase<ConcatRelationsOptions> implements RelationsNode<ConcatRelationsOptions>
{
}
```

```html
<relations-node-header [parent]="this" [destroySubject]="destroySubject"/>

<div class="node-content">
    <div class="inputs-outputs">
        <div class="inputs">
            <div class="input">
                <relation-node-input [parentCoordiantes]="nodePosition" [zoomLevel]="zoomLevel" name="first" [parent]="this"/>
                <div>First</div>
            </div>

            <div class="input">
                <relation-node-input [parentCoordiantes]="nodePosition" [zoomLevel]="zoomLevel" name="second" [parent]="this"/>
                <div>Second</div>
            </div>
        </div>

        <div class="outputs">
            <div class="output">
                <div>Result</div>
                <relation-node-output [parentCoordiantes]="nodePosition" [zoomLevel]="zoomLevel" name="result" [parent]="this"/>
            </div>
        </div>
    </div>
</div>
```

`type.ts`:

```ts
import {ConcatRelations} from './concat.relations';

export default ConcatRelations;
```

Page and metadata:

```ts
import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {RelationsManager} from '@anglr/dynamic/relations';
import {withLayoutRelationsRuntime} from '@anglr/dynamic/layout-relations';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {withMyComponents} from '../ownPackage/myComponents';
import {pureRelationsNodeLayout, pureRelationsNodeRelations} from './pureRelationsNode.data';

/**
 * Uses pure relations node from own package between layout components
 */
@Component(
{
    selector: 'pure-relations-node-sample',
    templateUrl: 'pureRelationsNode.component.html',
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    providers:
    [
        provideDynamic(withLayoutRelationsRuntime(),
                       withBasicComponents(),
                       withMyComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PureRelationsNodeComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Layout metadata to be rendered
     */
    protected metadata: LayoutComponentMetadata = pureRelationsNodeLayout;

    //######################### constructor #########################
    constructor()
    {
        inject(RelationsManager).setRelations(pureRelationsNodeRelations);
    }
}
```

```html
<ng-container *layoutComponentRenderer="metadata"/>
```

```ts
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {RelationsComponentMetadata} from '@anglr/dynamic/relations';

import {ConcatRelationsOptions} from '../ownPackage/myComponents';

/**
 * Layout metadata with two counters and html block displaying result
 */
export const pureRelationsNodeLayout: LayoutComponentMetadata =
{
    id: 'stackPanel-root',
    displayName: 'root',
    package: 'basic-components',
    name: 'stackPanel',
    options:
    {
        children:
        [
            {
                id: 'counter-first',
                package: 'my-components',
                name: 'counter',
                options:
                {
                    label: 'First',
                    step: 1,
                },
            },
            {
                id: 'counter-second',
                package: 'my-components',
                name: 'counter',
                options:
                {
                    label: 'Second',
                    step: 5,
                },
            },
            {
                id: 'htmlBlock-result',
                package: 'basic-components',
                name: 'htmlBlock',
                options:
                {
                    content: '',
                },
            },
        ],
    },
};

/**
 * Relations metadata, pure relations node 'concat' joins counts of counters and sends result to html block
 */
export const pureRelationsNodeRelations: RelationsComponentMetadata[] =
[
    {
        id: 'counter-first',
        package: 'layout-components',
        name: 'counter-first',
        relationsOptions: null,
        outputs:
        [
            {
                outputName: 'count',
                inputs:
                [
                    {id: 'concat-counts', inputName: 'first'},
                ],
            },
        ],
    },
    {
        id: 'counter-second',
        package: 'layout-components',
        name: 'counter-second',
        relationsOptions: null,
        outputs:
        [
            {
                outputName: 'count',
                inputs:
                [
                    {id: 'concat-counts', inputName: 'second'},
                ],
            },
        ],
    },
    {
        id: 'concat-counts',
        package: 'my-components',
        name: 'concat',
        relationsOptions: <ConcatRelationsOptions>
        {
            separator: ' + ',
        },
        outputs:
        [
            {
                outputName: 'result',
                inputs:
                [
                    {id: 'htmlBlock-result', inputName: 'content'},
                ],
            },
        ],
    },
    {
        id: 'htmlBlock-result',
        package: 'layout-components',
        name: 'htmlBlock-result',
        relationsOptions: null,
    },
];
```

### Layout editor

A complete layout editor page: the package selection is remembered under a storage name, hotkeys are enabled, and the page adds Save/Undo/Redo buttons. Save reads the current metadata from `EDITOR_METADATA_MANAGER` and marks the state as saved in history (the `*` disappears). `ctrl+s` is handled through `EditorHotkeys.save`. This page needs the application-level providers listed in [Project setup](#project-setup), including the drag & drop provider and `AppHotkeysService`.

```ts
import {Component, ChangeDetectionStrategy, ChangeDetectorRef, inject, signal, WritableSignal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {EDITOR_METADATA_MANAGER, EditorHotkeys, EditorMetadataManager, provideDynamic, withEditorHotkeys, withPackageManager} from '@anglr/dynamic';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LAYOUT_HISTORY_MANAGER, LayoutEditorComponent, withLayoutEditor} from '@anglr/dynamic/layout-editor';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {withMyComponents} from '../ownPackage/myComponents';
import {createEmptyLayout} from './layoutEditor.data';

/**
 * Layout editor with saving, undo/redo and hotkeys
 */
@Component(
{
    selector: 'layout-editor-sample',
    templateUrl: 'layoutEditor.component.html',
    host:
    {
        class: 'flex-column',
        style: 'height: 80vh',
    },
    imports:
    [
        LayoutEditorComponent,
    ],
    providers:
    [
        provideDynamic(withLayoutEditor(),
                       withPackageManager('LAYOUT_EDITOR_PACKAGES'),
                       withEditorHotkeys(),
                       withBasicComponents(),
                       withMyComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutEditorSampleComponent
{
    //######################### protected fields #########################

    /**
     * Gives access to metadata currently edited in editor
     */
    protected metadataManager: EditorMetadataManager<LayoutComponentMetadata> = inject(EDITOR_METADATA_MANAGER);

    //######################### protected properties - template bindings #########################

    /**
     * Undo/redo history of layout editor
     */
    protected history = inject(LAYOUT_HISTORY_MANAGER);

    /**
     * Layout metadata to be edited
     */
    protected metadata: LayoutComponentMetadata = createEmptyLayout();

    /**
     * Last saved metadata as JSON
     */
    protected savedMetadata: WritableSignal<string> = signal('');

    //######################### constructor #########################
    constructor()
    {
        const changeDetector = inject(ChangeDetectorRef);

        //refresh undo/redo buttons
        this.history.historyChange
            .pipe(takeUntilDestroyed())
            .subscribe(() => changeDetector.markForCheck());

        //ctrl+s
        inject(EditorHotkeys).save
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.save());
    }

    //######################### protected methods - template bindings #########################

    /**
     * Saves current metadata from editor
     */
    protected save(): void
    {
        const metadata = this.metadataManager.getMetadata();

        this.history.save();
        this.savedMetadata.set(JSON.stringify(metadata, null, 4));
    }
}
```

```html
<div class="flex-row gap-small margin-bottom-small">
    <button type="button" class="btn btn-primary" (click)="save()">Save{{history.saved ? '' : ' *'}}</button>
    <button type="button" class="btn btn-default" [disabled]="!history.canUndo" (click)="history.undo()">Undo</button>
    <button type="button" class="btn btn-default" [disabled]="!history.canRedo" (click)="history.redo()">Redo</button>
</div>

<layout-editor class="flex-1" [metadata]="metadata"/>

@if(savedMetadata())
{
    <pre class="margin-top-small">{{savedMetadata()}}</pre>
}
```

A new layout starts with a root container:

```ts
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {generateId} from '@jscrpt/common';

/**
 * Creates new empty layout with stack panel as root component
 */
export function createEmptyLayout(): LayoutComponentMetadata
{
    return {
        id: `stackPanel-${generateId(10)}`,
        displayName: 'root',
        package: 'basic-components',
        name: 'stackPanel',
        options:
        {
            children: [],
        },
    };
}
```

### Relations editor

A relations editor for an existing layout. `withLayoutRelationsEditor()` turns the relations-capable components of the layout passed to `LayoutManager.setLayout()` into nodes (package `layout-components`). The edited metadata is `RelationsNodeMetadata[]`, the runtime metadata extended with node positions. The layout is the one from [Pure relations node](#pure-relations-node).

```ts
import {Component, ChangeDetectionStrategy, inject, signal, WritableSignal} from '@angular/core';
import {EDITOR_METADATA_MANAGER, EditorMetadataManager, provideDynamic, withPackageManager} from '@anglr/dynamic';
import {RelationsEditorComponent, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {LayoutManager, withLayoutRelationsEditor} from '@anglr/dynamic/layout-relations';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {withMyComponents} from '../ownPackage/myComponents';
import {pureRelationsNodeLayout} from '../pureRelationsNode/pureRelationsNode.data';
import {relationsEditorRelations} from './relationsEditor.data';

/**
 * Relations editor for layout, layout components are available as nodes
 */
@Component(
{
    selector: 'relations-editor-sample',
    templateUrl: 'relationsEditor.component.html',
    host:
    {
        class: 'flex-column',
        style: 'height: 80vh',
    },
    imports:
    [
        RelationsEditorComponent,
    ],
    providers:
    [
        provideDynamic(withLayoutRelationsEditor(),
                       withPackageManager('RELATIONS_EDITOR_PACKAGES'),
                       withBasicComponents(),
                       withMyComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsEditorSampleComponent
{
    //######################### protected fields #########################

    /**
     * Gives access to metadata currently edited in editor
     */
    protected metadataManager: EditorMetadataManager<RelationsNodeMetadata[]> = inject(EDITOR_METADATA_MANAGER);

    //######################### protected properties - template bindings #########################

    /**
     * Relations metadata to be edited
     */
    protected metadata: RelationsNodeMetadata[] = relationsEditorRelations;

    /**
     * Last saved metadata as JSON
     */
    protected savedMetadata: WritableSignal<string> = signal('');

    //######################### constructor #########################
    constructor()
    {
        //layout whose components are available in relations editor
        inject(LayoutManager).setLayout(pureRelationsNodeLayout);
    }

    //######################### protected methods - template bindings #########################

    /**
     * Saves current metadata from editor
     */
    protected save(): void
    {
        this.savedMetadata.set(JSON.stringify(this.metadataManager.getMetadata(), null, 4));
    }
}
```

```html
<div class="flex-row gap-small margin-bottom-small">
    <button type="button" class="btn btn-primary" (click)="save()">Save</button>
</div>

<relations-editor class="flex-1" [metadata]="metadata"/>

@if(savedMetadata())
{
    <pre class="margin-top-small">{{savedMetadata()}}</pre>
}
```

```ts
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';

/**
 * Relations metadata edited by relations editor, same as runtime metadata extended with 'nodeMetadata' (position in editor)
 */
export const relationsEditorRelations: RelationsNodeMetadata[] =
[
    {
        id: 'counter-first',
        package: 'layout-components',
        name: 'counter-first',
        relationsOptions: null,
        nodeMetadata: {coordinates: {x: 40, y: 40}, scopeConfigurable: false, options: null},
        outputs:
        [
            {
                outputName: 'count',
                inputs:
                [
                    {id: 'concat-counts', inputName: 'first'},
                ],
            },
        ],
    },
    {
        id: 'counter-second',
        package: 'layout-components',
        name: 'counter-second',
        relationsOptions: null,
        nodeMetadata: {coordinates: {x: 40, y: 220}, scopeConfigurable: false, options: null},
        outputs:
        [
            {
                outputName: 'count',
                inputs:
                [
                    {id: 'concat-counts', inputName: 'second'},
                ],
            },
        ],
    },
    {
        id: 'concat-counts',
        package: 'my-components',
        name: 'concat',
        relationsOptions:
        {
            separator: ' + ',
        },
        nodeMetadata: {coordinates: {x: 340, y: 120}, scopeConfigurable: true, options: null},
        outputs:
        [
            {
                outputName: 'result',
                inputs:
                [
                    {id: 'htmlBlock-result', inputName: 'content'},
                ],
            },
        ],
    },
    {
        id: 'htmlBlock-result',
        package: 'layout-components',
        name: 'htmlBlock-result',
        relationsOptions: null,
        nodeMetadata: {coordinates: {x: 640, y: 120}, scopeConfigurable: false, options: null},
    },
];
```

### Custom property editor

When the generic controls aren't enough, a properties control can render any UI. `ColorPropertiesControlComponent` extends `PropertiesControlBase` and writes into `form.controls.color`; the properties editor applies the value to the component and records it in history. The `color` property of the model has no `@LayoutPropertyType`, so the generic control skips it.

`badge.options.ts`:

```ts
/**
 * Options for badge component
 */
export interface BadgeComponentOptions
{
    /**
     * Text displayed in badge
     */
    text: string|undefined|null;

    /**
     * Background color of badge
     */
    color: string|undefined|null;
}
```

`misc/colorPropertiesControl.component.ts` and `misc/colorPropertiesControl.component.html`:

```ts
import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {PropertiesControl, PropertiesControlBase} from '@anglr/dynamic/layout-editor';

import {BadgeComponentOptions} from '../badge.options';

/**
 * Custom properties control for editing 'color' option, offers predefined colors and color picker
 */
@Component(
{
    selector: 'color-properties-control',
    templateUrl: 'colorPropertiesControl.component.html',
    imports:
    [
        ReactiveFormsModule,
    ],
})
export class ColorPropertiesControlComponent extends PropertiesControlBase<BadgeComponentOptions> implements PropertiesControl<BadgeComponentOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Predefined colors
     */
    protected presets: string[] = ['#2e7d32', '#1565c0', '#c62828', '#ef6c00'];

    //######################### protected methods - template bindings #########################

    /**
     * Sets color into form of properties editor, change is propagated to component and history
     * @param color - Color to be set
     */
    protected setColor(color: string): void
    {
        this.form?.controls.color.setValue(color);
    }
}
```

```html
@if(form)
{
    <div class="properties-form-group" [formGroup]="form">
        <label class="properties-control-label">Color</label>

        <div class="flex-row gap-extra-small">
            @for(preset of presets; track preset)
            {
                <button type="button" class="btn" [style.background-color]="preset" (click)="setColor(preset)">&nbsp;</button>
            }

            <input type="color" formControlName="color">
        </div>
    </div>
}
```

`metadata/badge.layoutMetadata.ts` – the custom control is listed next to the generic one:

```ts
import {genericPropertiesControlFor, getPropertiesControl, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {BadgeComponentOptions} from '../badge.options';
import {BadgeModel} from './badge.model';
import {ColorPropertiesControlComponent} from '../misc/colorPropertiesControl.component';

/**
 * Badge layout editor metadata
 */
export class BadgeLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<BadgeComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<BadgeComponentOptions> =
    {
        name: 'Badge',
        description: 'Colored badge with text',
        group: 'My components',
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: BadgeModel,
                    propertiesControls:
                    [
                        genericPropertiesControlFor<BadgeModel>(['text']),
                        getPropertiesControl(ColorPropertiesControlComponent),
                    ],
                },
            ],
        },
        defaultOptions:
        {
            text: 'New',
            color: '#2e7d32',
        },
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}
```

`metadata/badge.model.ts`:

```ts
import {DefaultKnownPropertyTypes, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {BadgeComponentOptions} from '../badge.options';

/**
 * Badge model for properties editor
 */
export class BadgeModel implements BadgeComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Text')
    @LayoutPropertyDescription('Text displayed in badge')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public text: string|undefined|null = null;

    /**
     * @inheritdoc, edited by custom properties control
     */
    public color: string|undefined|null = null;

    //######################### constructor #########################
    constructor(value: BadgeComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}
```

The rest of the badge item:

```ts
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {HostDisplayBlockStyle} from '@anglr/common';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

import {BadgeComponentOptions} from './badge.options';
import {BadgeLayoutMetadataLoader} from './badge.metadata';

/**
 * Component displaying colored badge
 */
@Component(
{
    selector: 'badge',
    templateUrl: 'badge.component.html',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorMetadata(BadgeLayoutMetadataLoader)
export class BadgeComponent extends LayoutComponentBase<BadgeComponentOptions> implements LayoutComponent<BadgeComponentOptions>
{
}
```

```html
<span class="padding-extra-small" [style.background-color]="options?.color" [style.color]="'#fff'">{{options?.text}}</span>
```

```ts
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {BadgeComponentOptions} from './badge.options';

/**
 * Badge layout metadata loader
 */
export const BadgeLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<BadgeComponentOptions>> = async () => new (await import('./metadata/badge.layoutMetadata')).BadgeLayoutEditorMetadata();
```

```ts
import {ComponentStylingExtension} from '@anglr/dynamic/layout';

import {BadgeComponent} from './badge.component';

export default BadgeComponent;

export const extensions = [ComponentStylingExtension];
```

The editor page is the same as in [Custom layout component with editable properties](#custom-layout-component-with-editable-properties), with a layout that contains a badge:

```ts
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorComponent, withLayoutEditor} from '@anglr/dynamic/layout-editor';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {withMyComponents} from '../ownPackage/myComponents';
import {customPropertyEditorLayout} from './customPropertyEditor.data';

/**
 * Layout editor displaying badge, whose color is edited by custom properties control
 */
@Component(
{
    selector: 'custom-property-editor-sample',
    templateUrl: 'customPropertyEditor.component.html',
    host:
    {
        class: 'flex-column',
        style: 'height: 80vh',
    },
    imports:
    [
        LayoutEditorComponent,
    ],
    providers:
    [
        provideDynamic(withLayoutEditor(),
                       withBasicComponents(),
                       withMyComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomPropertyEditorComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Layout metadata to be edited
     */
    protected metadata: LayoutComponentMetadata = customPropertyEditorLayout;
}
```

```html
<layout-editor class="flex-1" [metadata]="metadata" [packages]="['basic-components', 'my-components']"/>
```

### Overriding properties controls

Every properties control is resolved through DI, with its component type as the token, so it can be replaced without changing the metadata of any item. This page replaces the built-in `ComponentStylingPropertiesControlComponent` (the styling block shown for every built-in layout component) with a control that offers only predefined CSS classes, and reuses the built-in `MarginControlComponent` and `PaddingControlComponent`. The override is a `ValueProvider` placed after `provideDynamic()`. The same works for the item specific controls of the built-in packages and for your own controls registered with `getPropertiesControl()`.

`stylingPropertiesControl.component.ts` and `stylingPropertiesControl.component.html`:

```ts
import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentStylingOptions} from '@anglr/dynamic/layout';
import {MarginControlComponent, PaddingControlComponent, PropertiesControl, PropertiesControlBase} from '@anglr/dynamic/layout-editor';

/**
 * Styling properties control offering only predefined css classes, replaces built-in styling properties control
 */
@Component(
{
    selector: 'styling-properties-control',
    templateUrl: 'stylingPropertiesControl.component.html',
    imports:
    [
        ReactiveFormsModule,
        MarginControlComponent,
        PaddingControlComponent,
    ],
})
export class StylingPropertiesControlComponent extends PropertiesControlBase<ComponentStylingOptions> implements PropertiesControl<ComponentStylingOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Css classes that can be applied to component
     */
    protected cssClasses: string[] = ['', 'text-primary', 'text-success', 'text-danger', 'font-bold'];
}
```

```html
@if(form)
{
    <div class="properties-form-group" [formGroup]="form">
        <label class="properties-control-label">Css class</label>

        <select class="form-control" formControlName="cssClass">
            @for(cssClass of cssClasses; track cssClass)
            {
                <option [value]="cssClass">{{cssClass || '(none)'}}</option>
            }
        </select>
    </div>
}

<margin-control class="properties-form-group" [form]="form" [propertiesMetadata]="propertiesMetadata"/>
<padding-control class="properties-form-group" [form]="form" [propertiesMetadata]="propertiesMetadata"/>
```

The page with the layout editor and the override:

```ts
import {Component, ChangeDetectionStrategy, ValueProvider} from '@angular/core';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {ComponentStylingPropertiesControlComponent, LayoutEditorComponent, withLayoutEditor} from '@anglr/dynamic/layout-editor';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {StylingPropertiesControlComponent} from './stylingPropertiesControl.component';
import {overridePropertiesControlLayout} from './overridePropertiesControl.data';

/**
 * Layout editor using own styling properties control instead of built-in one
 */
@Component(
{
    selector: 'override-properties-control-sample',
    templateUrl: 'overridePropertiesControl.component.html',
    host:
    {
        class: 'flex-column',
        style: 'height: 80vh',
    },
    imports:
    [
        LayoutEditorComponent,
    ],
    providers:
    [
        provideDynamic(withLayoutEditor(),
                       withBasicComponents()),
        //component type of built-in properties control is token, value is component type used instead
        <ValueProvider>
        {
            provide: ComponentStylingPropertiesControlComponent,
            useValue: StylingPropertiesControlComponent,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverridePropertiesControlSampleComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Layout metadata to be edited
     */
    protected metadata: LayoutComponentMetadata = overridePropertiesControlLayout;
}
```

```html
<layout-editor class="flex-1" [metadata]="metadata" [packages]="['basic-components']"/>
```

The edited layout contains a text block with a CSS class:

```ts
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Layout metadata with text block, whose styling is edited by own styling properties control
 */
export const overridePropertiesControlLayout: LayoutComponentMetadata =
{
    id: 'stackPanel-root',
    displayName: 'root',
    package: 'basic-components',
    name: 'stackPanel',
    options:
    {
        children:
        [
            {
                id: 'textBlock-title',
                package: 'basic-components',
                name: 'textBlock',
                options:
                {
                    text: 'Select me and change my css class',
                    cssClass: 'text-primary',
                },
            },
        ],
    },
};
```

### Dynamic forms

The `form-components` package renders form fields from metadata. `FormComponentControlBuilder` (from `withFormControlBuilder()`) builds a `FormGroup` from the layout, using `controlName` of each field, and the group is passed to the fields through `FORM_COMPONENT_CONTROL` in the renderer providers.

```ts
import {Component, ChangeDetectionStrategy, Provider, WritableSignal, inject, signal} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata, LayoutComponentRendererDirective, withLayoutRuntime} from '@anglr/dynamic/layout';
import {FORM_COMPONENT_CONTROL, FormComponentControlBuilder, withFormComponents, withFormControlBuilder} from '@anglr/dynamic/form';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {dynamicFormsLayout} from './dynamicForms.data';

/**
 * Renders form from layout metadata and reads its value
 */
@Component(
{
    selector: 'dynamic-forms-sample',
    templateUrl: 'dynamicForms.component.html',
    imports:
    [
        JsonPipe,
        ReactiveFormsModule,
        LayoutComponentRendererDirective,
    ],
    providers:
    [
        provideDynamic(withLayoutRuntime(),
                       withBasicComponents(),
                       withFormComponents(),
                       withFormControlBuilder()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormsComponent
{
    //######################### protected fields #########################

    /**
     * Builds form group from form components in layout metadata
     */
    protected formBuilder: FormComponentControlBuilder = inject(FormComponentControlBuilder);

    //######################### protected properties - template bindings #########################

    /**
     * Layout metadata of form
     */
    protected metadata: LayoutComponentMetadata = dynamicFormsLayout;

    /**
     * Form group built from metadata
     */
    protected form: WritableSignal<FormGroup|null> = signal(null);

    /**
     * Providers passed to rendered form components, contains parent form group
     */
    protected formProviders: Provider[] = [];

    /**
     * Submitted value of form
     */
    protected value: WritableSignal<unknown> = signal(null);

    //######################### constructor #########################
    constructor()
    {
        this.initForm();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Reads value of form
     * @param form - Form group which value is read
     */
    protected submit(form: FormGroup): void
    {
        this.value.set(form.value);
    }

    //######################### protected methods #########################

    /**
     * Builds form group and passes it to form components
     */
    protected async initForm(): Promise<void>
    {
        const form = await this.formBuilder.build(this.metadata);

        this.formProviders = [{provide: FORM_COMPONENT_CONTROL, useValue: form}];
        this.form.set(form);
    }
}
```

```html
@if(form(); as form)
{
    <form [formGroup]="form" (ngSubmit)="submit(form)">
        <ng-container *layoutComponentRenderer="metadata; providers: formProviders"/>

        <button type="submit" class="btn btn-primary margin-top-small">Submit</button>
    </form>
}

@if(value())
{
    <pre class="margin-top-small">{{value() | json}}</pre>
}
```

```ts
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Layout metadata of form, each form component defines 'controlName' of its control in form group
 */
export const dynamicFormsLayout: LayoutComponentMetadata =
{
    id: 'stackPanel-form',
    displayName: 'form',
    package: 'basic-components',
    name: 'stackPanel',
    options:
    {
        children:
        [
            {
                id: 'textField-name',
                package: 'form-components',
                name: 'textField',
                options:
                {
                    controlName: 'name',
                    label: 'Name',
                    placeholder: 'Enter your name',
                },
            },
            {
                id: 'numberField-age',
                package: 'form-components',
                name: 'numberField',
                options:
                {
                    controlName: 'age',
                    label: 'Age',
                    placeholder: 'Enter your age',
                },
            },
            {
                id: 'checkbox-newsletter',
                package: 'form-components',
                name: 'checkbox',
                options:
                {
                    controlName: 'newsletter',
                    label: 'Subscribe to newsletter',
                },
            },
        ],
    },
};
```

### Loading metadata from storage

The built-in `templateBlock` renders another layout loaded by id (`options.layoutId`) from the layout `MetadataStorage`, together with its relations from the relations `MetadataStorage`. Each template block instance gets its own layout and relations, so the same template can be used several times on one page. Real storages usually load metadata from a server; `getMetadata()` can also return a promise.

```ts
import {Injectable} from '@angular/core';
import {MetadataStorage} from '@anglr/dynamic';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {RelationsComponentMetadata} from '@anglr/dynamic/relations';

import {storedLayouts, storedRelations} from './metadataStorage.data';

/**
 * Storage of layout metadata, used for loading layouts by id (for example by 'templateBlock')
 */
@Injectable()
export class InMemoryLayoutMetadataStorage extends MetadataStorage<LayoutComponentMetadata>
{
    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override getMetadata(id: string): LayoutComponentMetadata|null
    {
        return structuredClone(storedLayouts[id]) ?? null;
    }
}

/**
 * Storage of relations metadata, used for loading relations of layout loaded by id
 */
@Injectable()
export class InMemoryRelationsMetadataStorage extends MetadataStorage<RelationsComponentMetadata[]>
{
    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override getMetadata(id: string): RelationsComponentMetadata[]|null
    {
        return structuredClone(storedRelations[id]) ?? null;
    }
}
```

```ts
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata, LayoutComponentRendererDirective, withLayoutMetadataStorage} from '@anglr/dynamic/layout';
import {withRelationsMetadataStorage} from '@anglr/dynamic/relations';
import {withLayoutRelationsRuntime} from '@anglr/dynamic/layout-relations';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {InMemoryLayoutMetadataStorage, InMemoryRelationsMetadataStorage} from './inMemoryMetadataStorage.service';
import {metadataStoragePage} from './metadataStorage.data';

/**
 * Renders layout which loads other layouts (with their relations) from metadata storage
 */
@Component(
{
    selector: 'metadata-storage-sample',
    templateUrl: 'metadataStorage.component.html',
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    providers:
    [
        provideDynamic(withLayoutRelationsRuntime(),
                       withLayoutMetadataStorage(InMemoryLayoutMetadataStorage),
                       withRelationsMetadataStorage(InMemoryRelationsMetadataStorage),
                       withBasicComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataStorageComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Layout metadata to be rendered
     */
    protected metadata: LayoutComponentMetadata = metadataStoragePage;
}
```

```html
<ng-container *layoutComponentRenderer="metadata"/>
```

```ts
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {RelationsComponentMetadata} from '@anglr/dynamic/relations';

/**
 * Stored layout templates, key is id of template
 */
export const storedLayouts: Record<string, LayoutComponentMetadata> =
{
    'toggle-section':
    {
        id: 'stackPanel-section',
        package: 'basic-components',
        name: 'stackPanel',
        options:
        {
            children:
            [
                {
                    id: 'toggleButton-section',
                    package: 'basic-components',
                    name: 'toggleButton',
                    options:
                    {
                        onText: 'Hide',
                        offText: 'Show',
                        state: true,
                        buttonCssClass: 'btn btn-primary',
                    },
                },
                {
                    id: 'ifBlock-section',
                    package: 'basic-components',
                    name: 'ifBlock',
                    options:
                    {
                        condition: true,
                        content:
                        {
                            id: 'textBlock-section',
                            package: 'basic-components',
                            name: 'textBlock',
                            options:
                            {
                                text: 'Content of template loaded from metadata storage',
                            },
                        },
                    },
                },
            ],
        },
    },
};

/**
 * Stored relations of layout templates, key is id of template
 */
export const storedRelations: Record<string, RelationsComponentMetadata[]> =
{
    'toggle-section':
    [
        {
            id: 'toggleButton-section',
            package: 'layout-components',
            name: 'toggleButton-section',
            relationsOptions: null,
            outputs:
            [
                {
                    outputName: 'toggle',
                    inputs:
                    [
                        {id: 'ifBlock-section', inputName: 'condition'},
                    ],
                },
            ],
        },
        {
            id: 'ifBlock-section',
            package: 'layout-components',
            name: 'ifBlock-section',
            relationsOptions: null,
        },
    ],
};

/**
 * Page layout that displays stored template twice using 'templateBlock'
 */
export const metadataStoragePage: LayoutComponentMetadata =
{
    id: 'stackPanel-root',
    displayName: 'root',
    package: 'basic-components',
    name: 'stackPanel',
    options:
    {
        children:
        [
            {
                id: 'templateBlock-first',
                package: 'basic-components',
                name: 'templateBlock',
                options:
                {
                    layoutId: 'toggle-section',
                },
            },
            {
                id: 'templateBlock-second',
                package: 'basic-components',
                name: 'templateBlock',
                options:
                {
                    layoutId: 'toggle-section',
                },
            },
        ],
    },
};
```

### Overriding defaults

A `DefaultsOverride` changes default options and display names of items dropped from the palettes, for any package. One implementation can serve both editors: `withLayoutDefaultsOverride()` for the layout editor (every new button is green and says *Submit*) and `withRelationsDefaultsOverride()` for the relations editor (every new `concat` node uses `', '`).

```ts
import {Injectable} from '@angular/core';
import {DefaultsOverride} from '@anglr/dynamic';
import {ButtonComponentOptions} from '@anglr/dynamic/basic-components';

import {ConcatRelationsOptions} from '../ownPackage/myComponents';

/**
 * Overrides default options and display names of items dropped from palette
 */
@Injectable()
export class MyDefaultsOverride extends DefaultsOverride
{
    //######################### public methods - implementation of DefaultsOverride #########################

    /**
     * @inheritdoc
     */
    public getOptions(packageName: string, name: string, defaultOptions: unknown): unknown
    {
        //layout editor - every new button is green
        if(packageName == 'basic-components' && name == 'button')
        {
            return <Partial<ButtonComponentOptions>>
            {
                ...defaultOptions as ButtonComponentOptions,
                text: 'Submit',
                buttonCssClass: 'btn btn-success',
            };
        }

        //relations editor - every new concat node uses comma as separator
        if(packageName == 'my-components' && name == 'concat')
        {
            return <ConcatRelationsOptions>
            {
                separator: ', ',
            };
        }

        return defaultOptions;
    }

    /**
     * @inheritdoc
     */
    public getDisplayName(_packageName: string, name: string, displayName?: string): string
    {
        return displayName || `my ${name}`;
    }
}
```

```ts
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorComponent, withLayoutDefaultsOverride, withLayoutEditor} from '@anglr/dynamic/layout-editor';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {MyDefaultsOverride} from './myDefaultsOverride.service';
import {createEmptyLayout} from '../layoutEditor/layoutEditor.data';

/**
 * Layout editor using overridden defaults
 */
@Component(
{
    selector: 'defaults-layout-editor',
    template: '<layout-editor class="flex-1" [metadata]="metadata" [packages]="[\'basic-components\']"/>',
    host:
    {
        class: 'flex-column flex-1',
    },
    imports:
    [
        LayoutEditorComponent,
    ],
    providers:
    [
        provideDynamic(withLayoutEditor(),
                       withLayoutDefaultsOverride(MyDefaultsOverride),
                       withBasicComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultsLayoutEditorComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Layout metadata to be edited
     */
    protected metadata: LayoutComponentMetadata = createEmptyLayout();
}
```

```ts
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {provideDynamic, withPackageManager} from '@anglr/dynamic';
import {RelationsEditorComponent, RelationsNodeMetadata, withRelationsDefaultsOverride, withRelationsEditor} from '@anglr/dynamic/relations-editor';

import {withMyComponents} from '../ownPackage/myComponents';
import {MyDefaultsOverride} from './myDefaultsOverride.service';

/**
 * Relations editor using overridden defaults
 */
@Component(
{
    selector: 'defaults-relations-editor',
    template: '<relations-editor class="flex-1" [metadata]="metadata" [packages]="[\'my-components\']"/>',
    host:
    {
        class: 'flex-column flex-1',
    },
    imports:
    [
        RelationsEditorComponent,
    ],
    providers:
    [
        provideDynamic(withRelationsEditor(),
                       withPackageManager('DEFAULTS_RELATIONS_PACKAGES'),
                       withRelationsDefaultsOverride(MyDefaultsOverride),
                       withMyComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultsRelationsEditorComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Relations metadata to be edited
     */
    protected metadata: RelationsNodeMetadata[] = [];
}
```

### Static components in relations

Ordinary Angular components used directly in a template can take part in relations. Each one registers itself in `RelationsComponentManager` under a fixed relations id, waits for `RelationsProcessor.initialized`, calls `updateRelations()` and cleans up on destroy. In metadata they use package `static-components` and their relations id as `id` and `name`. A `StaticComponentsRegister` registered with `withStaticComponents()` makes them available in the relations editor.

`nameInput/nameInput.component.ts` – output `name`:

```ts
import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, OnInit, inject} from '@angular/core';
import {DynamicOutput, RelationsComponent, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {NameInputRelationsMetadataLoader} from './nameInput.metadata';

/**
 * Static component (used directly in template) that sends entered name into relations
 */
@Component(
{
    selector: 'name-input',
    template: '<input type="text" placeholder="Your name" (input)="setName($event)">',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(NameInputRelationsMetadataLoader)
export class NameInputComponent implements RelationsComponent, OnInit, OnDestroy
{
    //######################### public static properties #########################

    /**
     * Id of component in relations metadata
     */
    public static readonly relationsId: string = 'name-input';

    //######################### protected fields #########################

    /**
     * Instance of change detector
     */
    protected changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
     * Processor of relations
     */
    protected relationsProcessor: RelationsProcessor = inject(RelationsProcessor);

    /**
     * Registry of components participating in relations
     */
    protected componentManager: RelationsComponentManager = inject(RelationsComponentManager);

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: unknown;

    //######################### public properties - dynamic outputs #########################

    /**
     * Entered name
     */
    @DynamicOutput()
    public name: string|undefined|null;

    //######################### public methods - implementation of OnInit #########################

    /**
     * Registers component into relations
     */
    public async ngOnInit(): Promise<void>
    {
        this.componentManager.registerComponent(NameInputComponent.relationsId, this);
        await this.relationsProcessor.initialized;
        this.relationsProcessor.updateRelations(NameInputComponent.relationsId);
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Removes component from relations
     */
    public ngOnDestroy(): void
    {
        this.relationsProcessor.destroyComponent(NameInputComponent.relationsId);
        this.componentManager.unregisterComponent(NameInputComponent.relationsId);
    }

    //######################### public methods - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this.changeDetector.markForCheck();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Sets name from input element
     * @param event - Input event
     */
    protected setName(event: Event): void
    {
        this.name = (event.target as HTMLInputElement).value;
    }
}
```

`greeting/greeting.component.ts` – input `name`:

```ts
import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnDestroy, OnInit, SimpleChanges, inject} from '@angular/core';
import {RelationsComponent, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {GreetingRelationsMetadataLoader} from './greeting.metadata';

/**
 * Static component (used directly in template) that displays greeting for name received from relations
 */
@Component(
{
    selector: 'greeting',
    template: '<div>{{greeting}}</div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(GreetingRelationsMetadataLoader)
export class GreetingComponent implements RelationsComponent, OnInit, OnDestroy
{
    //######################### public static properties #########################

    /**
     * Id of component in relations metadata
     */
    public static readonly relationsId: string = 'greeting';

    //######################### protected fields #########################

    /**
     * Instance of change detector
     */
    protected changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
     * Processor of relations
     */
    protected relationsProcessor: RelationsProcessor = inject(RelationsProcessor);

    /**
     * Registry of components participating in relations
     */
    protected componentManager: RelationsComponentManager = inject(RelationsComponentManager);

    //######################### protected properties - template bindings #########################

    /**
     * Displayed greeting
     */
    protected greeting: string = 'Hello stranger';

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: unknown;

    //######################### public properties - inputs #########################

    /**
     * Name of greeted person, set by relations
     */
    @Input()
    public name: string|undefined|null;

    //######################### public methods - implementation of OnInit #########################

    /**
     * Registers component into relations
     */
    public async ngOnInit(): Promise<void>
    {
        this.componentManager.registerComponent(GreetingComponent.relationsId, this);
        await this.relationsProcessor.initialized;
        this.relationsProcessor.updateRelations(GreetingComponent.relationsId);
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Removes component from relations
     */
    public ngOnDestroy(): void
    {
        this.relationsProcessor.destroyComponent(GreetingComponent.relationsId);
        this.componentManager.unregisterComponent(GreetingComponent.relationsId);
    }

    //######################### public methods - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public dynamicOnChanges(changes: SimpleChanges): void
    {
        if(nameof<GreetingComponent>('name') in changes)
        {
            this.greeting = `Hello ${this.name || 'stranger'}`;
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this.changeDetector.markForCheck();
    }
}
```

Relations editor metadata of `nameInput` (`nameInput.metadata.ts`, `metadata/nameInput.relationsMetadata.ts`, `node/nameInputNode.component.ts` / `.html`):

```ts
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

/**
 * Name input relations metadata loader
 */
export const NameInputRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/nameInput.relationsMetadata')).NameInputRelationsEditorMetadata();
```

```ts
import {Type} from '@angular/core';
import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataInfo, RelationsNode} from '@anglr/dynamic/relations-editor';

import {NameInputNodeComponent} from '../node/nameInputNode.component';

/**
 * Name input relations editor metadata
 */
export class NameInputRelationsEditorMetadata implements RelationsEditorMetadataDescriptor
{
    //######################### public properties - implementation of RelationsEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: RelationsEditorMetadataInfo =
    {
        name: 'Name input',
        description: 'Input for entering name',
        group: 'Static',
    };

    /**
     * @inheritdoc
     */
    public nodeDefinition: Type<RelationsNode> = NameInputNodeComponent;

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}
```

```ts
import {Component} from '@angular/core';
import {RelationNodeOutputComponent, RelationsNode, RelationsNodeBase, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations editor node for name input
 */
@Component(
{
    selector: 'name-input-node',
    templateUrl: 'nameInputNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeOutputComponent,
    ],
})
export class NameInputNodeComponent extends RelationsNodeBase implements RelationsNode
{
}
```

```html
<relations-node-header [parent]="this" [destroySubject]="destroySubject"/>

<div class="node-content">
    <div class="inputs-outputs">
        <div class="inputs">
        </div>

        <div class="outputs">
            <div class="output">
                <div>Name</div>
                <relation-node-output [parentCoordiantes]="nodePosition" [zoomLevel]="zoomLevel" name="name" [parent]="this"/>
            </div>
        </div>
    </div>
</div>
```

Relations editor metadata of `greeting` (`greeting.metadata.ts`, `metadata/greeting.relationsMetadata.ts`) follows the same pattern as `nameInput` (`GreetingRelationsMetadataLoader`, `GreetingRelationsEditorMetadata` with name `Greeting`, description `Displays greeting`, group `Static`, `nodeDefinition` `GreetingNodeComponent`). Its node has an input instead of an output (`node/greetingNode.component.ts` / `.html`):

```ts
import {Component} from '@angular/core';
import {RelationNodeInputComponent, RelationsNode, RelationsNodeBase, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations editor node for greeting
 */
@Component(
{
    selector: 'greeting-node',
    templateUrl: 'greetingNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
    ],
})
export class GreetingNodeComponent extends RelationsNodeBase implements RelationsNode
{
}
```

```html
<relations-node-header [parent]="this" [destroySubject]="destroySubject"/>

<div class="node-content">
    <div class="inputs-outputs">
        <div class="inputs">
            <div class="input">
                <relation-node-input [parentCoordiantes]="nodePosition" [zoomLevel]="zoomLevel" name="name" [parent]="this"/>
                <div>Name</div>
            </div>
        </div>

        <div class="outputs">
        </div>
    </div>
</div>
```

Runtime page – only the relations runtime is needed:

```ts
import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {provideDynamic} from '@anglr/dynamic';
import {RelationsManager, withRelationsRuntime} from '@anglr/dynamic/relations';

import {GreetingComponent} from './greeting/greeting.component';
import {NameInputComponent} from './nameInput/nameInput.component';
import {StaticRelationsEditorComponent} from './staticRelationsEditor.component';
import {staticComponentsRelations} from './staticComponents.data';

/**
 * Connects components used directly in template using relations
 */
@Component(
{
    selector: 'static-components-sample',
    templateUrl: 'staticComponents.component.html',
    imports:
    [
        NameInputComponent,
        GreetingComponent,
        StaticRelationsEditorComponent,
    ],
    providers:
    [
        provideDynamic(withRelationsRuntime()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaticComponentsComponent
{
    //######################### constructor #########################
    constructor()
    {
        inject(RelationsManager).setRelations(staticComponentsRelations);
    }
}
```

```html
<name-input/>
<greeting/>

<h3>Relations editor</h3>
<static-relations-editor/>
```

```ts
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';

/**
 * Relations between static components, static components use package 'static-components' and their relations id as id and name
 */
export const staticComponentsRelations: RelationsNodeMetadata[] =
[
    {
        id: 'name-input',
        package: 'static-components',
        name: 'name-input',
        relationsOptions: null,
        nodeMetadata: {coordinates: {x: 40, y: 60}, scopeConfigurable: false, options: null},
        outputs:
        [
            {
                outputName: 'name',
                inputs:
                [
                    {id: 'greeting', inputName: 'name'},
                ],
            },
        ],
    },
    {
        id: 'greeting',
        package: 'static-components',
        name: 'greeting',
        relationsOptions: null,
        nodeMetadata: {coordinates: {x: 340, y: 60}, scopeConfigurable: false, options: null},
    },
];
```

Register and relations editor of static components:

```ts
import {Injectable, Type} from '@angular/core';
import {StaticComponentsRegister} from '@anglr/dynamic/relations-editor';
import {Dictionary} from '@jscrpt/common';

import {GreetingComponent} from './greeting/greeting.component';
import {NameInputComponent} from './nameInput/nameInput.component';

/**
 * Register of static components, makes them available in relations editor under package 'static-components'
 */
@Injectable()
export class MyStaticComponentsRegister extends StaticComponentsRegister
{
    //######################### protected methods - implementation of StaticComponentsRegister #########################

    /**
     * @inheritdoc
     */
    protected getDefinedTypes(): Dictionary<Type<unknown>>
    {
        return {
            [NameInputComponent.relationsId]: NameInputComponent,
            [GreetingComponent.relationsId]: GreetingComponent,
        };
    }
}
```

```ts
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {provideDynamic, withPackageManager} from '@anglr/dynamic';
import {RelationsEditorComponent, RelationsNodeMetadata, withRelationsEditor, withStaticComponents} from '@anglr/dynamic/relations-editor';

import {MyStaticComponentsRegister} from './myStaticComponentsRegister.service';
import {staticComponentsRelations} from './staticComponents.data';

/**
 * Relations editor that offers static components as nodes
 */
@Component(
{
    selector: 'static-relations-editor',
    template: '<relations-editor class="flex-1" [metadata]="metadata" [packages]="[\'static-components\']"/>',
    host:
    {
        class: 'flex-column',
        style: 'height: 60vh',
    },
    imports:
    [
        RelationsEditorComponent,
    ],
    providers:
    [
        provideDynamic(withRelationsEditor(),
                       withPackageManager('STATIC_RELATIONS_PACKAGES'),
                       withStaticComponents(MyStaticComponentsRegister)),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaticRelationsEditorComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Relations metadata to be edited
     */
    protected metadata: RelationsNodeMetadata[] = structuredClone(staticComponentsRelations);
}
```

### Custom components

A *custom component* is a stored layout with its relations, used as one item of package `custom-components`. Its layout and relations are loaded from the metadata storages by the custom component name. `configurableProperties` of its configuration lists which properties of inner components can be set per instance; the values are stored in `contentOptions` of each instance. In the layout editor, custom components appear in the palette and `ShowCustomComponentOptionsDirective` opens a dialog for their configuration.

Register of custom components – usually backed by a server, here by in-memory data:

```ts
import {Injectable} from '@angular/core';
import {CustomComponentConfiguration, CustomComponentsRegister} from '@anglr/dynamic/layout-relations';
import {Observable, Subject} from 'rxjs';

import {customComponentsConfigurations} from './customComponents.data';

/**
 * Register of custom components (reusable layouts with relations), usually backed by server or storage
 */
@Injectable()
export class MyCustomComponentsRegister extends CustomComponentsRegister
{
    //######################### protected fields #########################

    /**
     * Used for emitting changes of registered custom components
     */
    protected registeredChangeSubject: Subject<void> = new Subject<void>();

    //######################### public properties #########################

    /**
     * Occurs when registered custom components or their configuration change, used for refreshing palette
     */
    public get registeredChange(): Observable<void>
    {
        return this.registeredChangeSubject.asObservable();
    }

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override getRegisteredComponents(): string[]
    {
        return Object.keys(customComponentsConfigurations);
    }

    /**
     * @inheritdoc
     */
    public override getConfigurationForComponent(name: string): CustomComponentConfiguration|null
    {
        return customComponentsConfigurations[name] ?? null;
    }

    /**
     * @inheritdoc
     */
    public override setConfigurationForComponent(name: string, config: CustomComponentConfiguration): void
    {
        customComponentsConfigurations[name] = config;
        this.registeredChangeSubject.next();
    }
}
```

Metadata storages keyed by custom component name:

```ts
import {Injectable} from '@angular/core';
import {MetadataStorage} from '@anglr/dynamic';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {RelationsComponentMetadata} from '@anglr/dynamic/relations';

import {customComponentsLayouts, customComponentsRelations} from './customComponents.data';

/**
 * Storage of layout metadata of custom components, name of custom component is used as id
 */
@Injectable()
export class CustomComponentsLayoutStorage extends MetadataStorage<LayoutComponentMetadata>
{
    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override getMetadata(id: string): LayoutComponentMetadata|null
    {
        return structuredClone(customComponentsLayouts[id]) ?? null;
    }
}

/**
 * Storage of relations metadata of custom components, name of custom component is used as id
 */
@Injectable()
export class CustomComponentsRelationsStorage extends MetadataStorage<RelationsComponentMetadata[]>
{
    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override getMetadata(id: string): RelationsComponentMetadata[]|null
    {
        return structuredClone(customComponentsRelations[id]) ?? null;
    }
}
```

Data – configuration, layout and relations of the custom component `contactCard`, and a page that uses it twice with different texts:

```ts
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {RelationsComponentMetadata} from '@anglr/dynamic/relations';
import {CustomComponentComponentOptions, CustomComponentConfiguration} from '@anglr/dynamic/layout-relations';

/**
 * Configurations of registered custom components, key is name of custom component
 */
export const customComponentsConfigurations: Record<string, CustomComponentConfiguration> =
{
    contactCard:
    {
        displayName: 'Contact card',
        description: 'Card with name and toggleable details',
        group: 'Custom components',
        //text of 'textBlock-name' can be set on each instance of custom component
        configurableProperties:
        {
            'textBlock-name':
            {
                TextBlockModel: ['text'],
            },
        },
    },
};

/**
 * Layout metadata of custom components, key is name of custom component
 */
export const customComponentsLayouts: Record<string, LayoutComponentMetadata> =
{
    contactCard:
    {
        id: 'stackPanel-contact',
        package: 'basic-components',
        name: 'stackPanel',
        options:
        {
            children:
            [
                {
                    id: 'textBlock-name',
                    package: 'basic-components',
                    name: 'textBlock',
                    options:
                    {
                        text: 'Name',
                    },
                },
                {
                    id: 'toggleButton-details',
                    package: 'basic-components',
                    name: 'toggleButton',
                    options:
                    {
                        onText: 'Hide details',
                        offText: 'Show details',
                        state: false,
                        buttonCssClass: 'btn btn-default',
                    },
                },
                {
                    id: 'ifBlock-details',
                    package: 'basic-components',
                    name: 'ifBlock',
                    options:
                    {
                        condition: false,
                        content:
                        {
                            id: 'textBlock-details',
                            package: 'basic-components',
                            name: 'textBlock',
                            options:
                            {
                                text: 'Details of contact',
                            },
                        },
                    },
                },
            ],
        },
    },
};

/**
 * Relations metadata of custom components, key is name of custom component
 */
export const customComponentsRelations: Record<string, RelationsComponentMetadata[]> =
{
    contactCard:
    [
        {
            id: 'toggleButton-details',
            package: 'layout-components',
            name: 'toggleButton-details',
            relationsOptions: null,
            outputs:
            [
                {
                    outputName: 'toggle',
                    inputs:
                    [
                        {id: 'ifBlock-details', inputName: 'condition'},
                    ],
                },
            ],
        },
        {
            id: 'ifBlock-details',
            package: 'layout-components',
            name: 'ifBlock-details',
            relationsOptions: null,
        },
    ],
};

/**
 * Page layout using custom component 'contactCard' twice, with different texts
 */
export const customComponentsPage: LayoutComponentMetadata =
{
    id: 'stackPanel-root',
    displayName: 'root',
    package: 'basic-components',
    name: 'stackPanel',
    options:
    {
        children:
        [
            {
                id: 'contactCard-first',
                package: 'custom-components',
                name: 'contactCard',
                options: <Partial<CustomComponentComponentOptions>>
                {
                    name: 'contactCard',
                    contentOptions:
                    {
                        'textBlock-name': {text: 'Alice'},
                    },
                },
            },
            {
                id: 'contactCard-second',
                package: 'custom-components',
                name: 'contactCard',
                options: <Partial<CustomComponentComponentOptions>>
                {
                    name: 'contactCard',
                    contentOptions:
                    {
                        'textBlock-name': {text: 'Bob'},
                    },
                },
            },
        ],
    },
};
```

Runtime page:

```ts
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata, LayoutComponentRendererDirective, withLayoutMetadataStorage} from '@anglr/dynamic/layout';
import {withRelationsMetadataStorage} from '@anglr/dynamic/relations';
import {withCustomComponents, withLayoutRelationsRuntime} from '@anglr/dynamic/layout-relations';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {MyCustomComponentsRegister} from './myCustomComponentsRegister.service';
import {CustomComponentsLayoutStorage, CustomComponentsRelationsStorage} from './customComponentsMetadataStorage.service';
import {CustomComponentsEditorComponent} from './customComponentsEditor.component';
import {customComponentsPage} from './customComponents.data';

/**
 * Renders layout that uses custom components, their layout and relations are loaded from metadata storages
 */
@Component(
{
    selector: 'custom-components-sample',
    templateUrl: 'customComponents.component.html',
    imports:
    [
        LayoutComponentRendererDirective,
        CustomComponentsEditorComponent,
    ],
    providers:
    [
        provideDynamic(withLayoutRelationsRuntime(),
                       withCustomComponents(MyCustomComponentsRegister),
                       withLayoutMetadataStorage(CustomComponentsLayoutStorage),
                       withRelationsMetadataStorage(CustomComponentsRelationsStorage),
                       withBasicComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponentsComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Layout metadata to be rendered
     */
    protected metadata: LayoutComponentMetadata = customComponentsPage;
}
```

```html
<ng-container *layoutComponentRenderer="metadata"/>

<h3>Layout editor</h3>
<custom-components-editor/>
```

Layout editor with custom components – the second argument of `withCustomComponents()` refreshes the palette whenever the register changes:

```ts
import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata, withLayoutMetadataStorage} from '@anglr/dynamic/layout';
import {LayoutEditorComponent, withLayoutEditor} from '@anglr/dynamic/layout-editor';
import {CustomComponentsRegister, ShowCustomComponentOptionsDirective, withCustomComponents} from '@anglr/dynamic/layout-relations';
import {withBasicComponents} from '@anglr/dynamic/basic-components';

import {MyCustomComponentsRegister} from './myCustomComponentsRegister.service';
import {CustomComponentsLayoutStorage} from './customComponentsMetadataStorage.service';
import {createEmptyLayout} from '../layoutEditor/layoutEditor.data';

/**
 * Layout editor with custom components in palette and button for configuring custom component
 */
@Component(
{
    selector: 'custom-components-editor',
    templateUrl: 'customComponentsEditor.component.html',
    host:
    {
        class: 'flex-column',
        style: 'height: 60vh',
    },
    imports:
    [
        LayoutEditorComponent,
        ShowCustomComponentOptionsDirective,
    ],
    providers:
    [
        provideDynamic(withLayoutEditor(),
                       withCustomComponents(MyCustomComponentsRegister, () => (inject(CustomComponentsRegister) as MyCustomComponentsRegister).registeredChange),
                       withLayoutMetadataStorage(CustomComponentsLayoutStorage),
                       withBasicComponents()),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponentsEditorComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Layout metadata to be edited
     */
    protected metadata: LayoutComponentMetadata = createEmptyLayout();
}
```

```html
<div class="flex-row gap-small margin-bottom-small">
    <button type="button" class="btn btn-primary" [showCustomComponentOptions]="'contactCard'">Contact card options</button>
</div>

<layout-editor class="flex-1" [metadata]="metadata" [packages]="['basic-components', 'custom-components']"/>
```

## Usage notes

- **Assign new references.** Relations skip a transfer when the new value is strictly equal to the previous one. When an output holds an object or array, assign a new instance instead of mutating the existing one (an event-like output can assign a new empty object on every event).
- **Invalidate after own changes.** Rendered layout components are detached from Angular change detection. When a component changes its own state (template events, timers), call `invalidateVisuals()`.
- **Unique ids.** Every layout component id must be unique within the rendered layout; the relations of a layout component use the same id.
- **Every relations target needs its own entry.** A component that only receives data (no outputs) still needs its own item in the relations metadata, otherwise it isn't connected.
- **Options must be present.** Extensions of a layout component (styling, relations registration) are initialized from its `options`; always store an `options` object, even an empty one.
- **Outputs and inputs are plain properties.** `@DynamicOutput()` defines accessors on the prototype, so keep `useDefineForClassFields: false` and use plain properties, not signals, for relations inputs and outputs.
- **Pure node constructor.** A pure relations node is created with `new Type(injector)`; use the injector argument to get services.
- **One scope, one graph.** `RelationsManager.setRelations()` must be called in the same injector scope (`provideDynamic()`) in which the layout is rendered.
- **Relations metadata storage.** `withRelationsMetadataStorage()` contributes to the layout runtime part of a scope, so combine it with `withLayoutRelationsRuntime()` or `withLayoutRelationsEditor()`.
- **Relations editor needs a package manager.** Always add `withPackageManager()` to a relations editor scope, even when `[packages]` is set.

## Dev instructions

- `npm install` in *root* directory
- run `npm start` in *root* directory
- open *Visual Studio Code* in *root* directory
- open *Visual Studio Code* in *demo* directory
- open browser at `http://localhost:8888`

## License

MIT
