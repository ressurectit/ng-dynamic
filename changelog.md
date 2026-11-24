# Changelog

## Version 1.1.1 (2026-11-24)

### Bug Fixes

- all following are fixed missing exports
- subpackage `@anglr/dynamic/layout-editor`
   - new `ComponentsTreeItemComponent` component, that displays components tree item
      - **implements**
         - `OnInit`
         - `OnDestroy`
      - **properties**
         - `data` instance of component tree item
         - `index` tree item index
         - `parentId` parent identifier
         - `open` indication whether node is open
      - **methods**
         - `toggle` toggle children visibility
         - `expand` expands tree node
         - `addDescendant` adds descendant component metadata to this component metadata
         - `expandAll` expands node and all its children
         - `collapse` collapse tree node
         - `collapseAll` collapse node and all its children
- subpackage `@anglr/dynamic/layout-relations`
   - new `ContentOptionsPropertiesControlComponent` component, used for displaying editation of content options
      - **extends**
         - `PropertiesControlBase`
      - **implements**
         - `PropertiesControl`
- subpackage `@anglr/dynamic/relations-editor`
   - new `RelationsNodeRendererDirectiveOptions` class, options for `RelationsNodeRendererDirective`
      - **properties**
         - `missingNodeBehavior` describes what should happen if relations node type described in metadata was not found
   - new `MissingNodeBehavior` enum, that defines behavior what should happen if rendered node type was not found
      - **values**
         - `ShowNotFound` shows special not found node as *placeholder*
         - `Ignore` ignores missing node, silently continues
         - `ThrowError` throws javascript error with missing node error
- subpackage `@anglr/dynamic/form`
   - new `RadioOption` interface, that represents radio option
      - **properties**
         - `code` radio option code
         - `text` visual representation for radio option
   - new `RadioPropertiesControlComponent` component, used for displaying editation of radio options
      - **extends**
         - `PropertiesControlBase`
      - **implements**
         - `PropertiesControl`
- subpackage `@anglr/dynamic/basic-components`
   - new `GridAreasDefinitionDialogComponent` component, used for defining grid areas
   - new `GridAreasPropertiesControlComponent` component, used for displaying editation of grid areas
      - **extends**
         - `PropertiesControlBase`
      - **implements**
         - `PropertiesControl`
- subpackage `@anglr/dynamic/rest-components`
   - new `MethodType` type, type of http method
   - new `ParamType` type, type of http rest parameter
   - new `RestParam` interface, definition of rest parameter
      - **properties**
         - `type` type of parameter
         - `configurable` indication whether this rest parameter can be configured using relations
         - `value` value of parameter
         - `name` name of parameter

## Version 1.1.0 (2026-11-23)

### Bug Fixes

- subpackage `@anglr/dynamic/relations`
   - fixed default value of `ngRelationsDebugger` global variable, now defaults to `false`, *relations debugger* hooks are enabled only when `ngRelationsDebugger` is explicitly defined as `true`

### Features

- subpackage `@anglr/dynamic/layout-editor`
   - updated `getPropertiesControl` function, now resolves *properties control* component using DI (component type is used as token), falls back to passed type if not provided, allows overriding of *properties controls*
   - updated `genericPropertiesControlFor` function, now resolves `DefaultGenericPropertiesControlComponent` using DI, allows overriding of *generic properties control*
   - updated `codePropertiesControlFor` function, now resolves `BaseCodePropertiesControlComponent` using DI, allows overriding of *code properties control*
   - updated `PropertiesControlRendererDirective` directive, `PropertiesControlGetter` is now called in *injection context*
   - updated `withLayoutEditor` core feature, now provides `ComponentStylingPropertiesControlComponent`, `DefaultGenericPropertiesControlComponent`, `BaseCodePropertiesControlComponent` *properties controls* as overridable tokens
- subpackage `@anglr/dynamic/layout-relations`
   - updated `withCustomComponents` feature, now provides its *properties controls* as overridable tokens
- subpackage `@anglr/dynamic/form`
   - updated `withFormComponents` feature, now provides its *properties controls* as overridable tokens
- subpackage `@anglr/dynamic/basic-components`
   - updated `withBasicComponents` feature, now provides its *properties controls* as overridable tokens
- subpackage `@anglr/dynamic/material-components`
   - updated `withMaterialComponents` feature, now provides its *properties controls* as overridable tokens
- subpackage `@anglr/dynamic/tinymce-components`
   - updated `withTinyMceComponents` feature, now provides its *properties controls* as overridable tokens

## Version 1.0.1 (2026-11-20)

### Bug Fixes

- subpackage `@anglr/dynamic/relations`
   - fixed initialization of `ngRelationsDebugger` global variable being removed by *tree shaking*, `init.debugger` is now marked as *side effect* in `package.json`

## Version 1.0.0 (2026-11-19)

### Features

- *dynamic* core, generic framework for building UIs from JSON metadata (dynamic items) with runtime rendering and visual editors
   - `provideDynamic` provider function, composes `CoreDynamicFeature` and `DynamicFeature` features (`DynamicFeatureType`: `LayoutRuntime`, `RelationsRuntime`, `LayoutEditor`, `RelationsEditor`)
   - `DynamicItemLoader` generic lazy loader of dynamic items, using `DynamicModuleProvider` and `DynamicModuleDataExtractor` (`DynamicModuleDataExtractorFn`, `defaultExportExtractor`, `extensionsExportsExtractor`) with caching and progress indication
   - `DynamicItemSource`, `DynamicItemMetadata`, `DynamicItem` interfaces and `DynamicOnInit`, `DynamicOnChanges`, `DynamicAfterViewInit` lifecycle interfaces
   - `DynamicItemExtension`, `DynamicItemExtensionBase` extensions mechanism (`extensions`, `childExtensions` exports of dynamic item)
   - `DynamicClassMetadata`, `DynamicPropertyMetadata` decorators, base for editor metadata, can be stripped from runtime builds using `ngDesignerMetadata` define
   - `DefaultsOverride` service, allows overriding default options and display names of items in editors
   - `PackageManager`, `PackageSource`, `provideStaticPackageSource` management of dynamic item packages used in editors, with `withPackageManager` (optionally persisted) feature and package manager UI
   - `MetadataStorage` for storing and loading metadata templates, `MetadataHistoryManager` undo/redo history for editors
   - `EditorHotkeys` editor hotkeys (save, undo, redo, copy, cut, paste, delete), enabled with `withEditorHotkeys`
   - *code editor* Monaco based code editor (`MONACO_EDITOR_RESOURCES_PATH`) with typings for code editors of `transformData` and `state` relations nodes available via `@anglr/dynamic/typings/transformData/monaco-type` and `@anglr/dynamic/typings/state/monaco-type`
   - `@anglr/dynamic/styles` SCSS styles with `dark` and `light` themes (`@anglr/dynamic/styles/themes/*`) and customizable `--dynamic-*` css variables
- subpackage `@anglr/dynamic/layout`
   - *layout* runtime rendering dynamic components from JSON metadata (`LayoutComponentMetadata`) via `LayoutComponentRendererDirective`
   - `withLayoutRuntime` core feature, `withLayoutMetadataStorage` feature
   - `LayoutComponent`, `LayoutComponentBase` base for layout components with `options`, hooks (`onInit`, `onOptionsSet`, ...) and `invalidateVisuals`
   - `LayoutRenderer`, `LayoutRendererOptions` with configurable behavior for missing types (`MissingTypeBehavior`)
   - `LAYOUT_COMPONENTS_LOADER`, `LAYOUT_COMPONENTS_MODULE_PROVIDERS` tokens for registering sources of layout components
   - `ComponentStylingExtension` extension applying *styling* options (css class, margin, padding, text styling) to layout components
   - `DynamicLayoutModule`, scopes support
- subpackage `@anglr/dynamic/layout-editor`
   - *layout editor* drag and drop visual editor of layout via `LayoutEditorComponent` (components tree, palette, properties editor, drag preview, hierarchy)
   - `withLayoutEditor` core feature, `withLayoutDefaultsOverride` feature
   - `LayoutEditorMetadata`, `LayoutEditorDesignerType`, `DescendantsGetter` decorators describing item for editor (`LayoutEditorMetadataDescriptor`)
   - `LayoutPropertyName`, `LayoutPropertyDescription`, `LayoutPropertyType`, `LayoutPropertyValues`, `LayoutPropertyObject` decorators for describing editable options
   - properties controls (`PropertiesControl`, `PropertiesControlBase`, `genericPropertiesControlFor`, `codePropertiesControlFor`, `getPropertiesControl`) and property type controls (`LAYOUT_EDITOR_PROPERTY_TYPE_CONTROLS`)
   - `LayoutEditorMetadataManager` for getting current metadata, whitelist and blacklist of items, styling, margin and padding controls
- subpackage `@anglr/dynamic/relations`
   - *relations* runtime connecting outputs of components with inputs of other components and pure relations nodes, described by JSON metadata (`RelationsComponentMetadata`)
   - `withRelationsRuntime` core feature, `withRelationsMetadataStorage` feature
   - `@DynamicOutput` decorator, `@PureRelationsComponent` decorator, `@DebugData` decorator
   - `RelationsComponent`, `RelationsManager`, `RelationsProcessor`, `RelationsComponentManager`, `RelationsChangeDetector`
   - `RELATIONS_COMPONENTS_LOADER`, `RELATIONS_COMPONENTS_MODULE_PROVIDERS` tokens for registering sources of relations components
   - `RelationsRegistrationExtension` registers layout components into relations
   - `CodeExecutor` for executing code configured in relations nodes
   - `RelationsDebugger` abstract debugger with `provideRelationsDebugger()` provider function
- subpackage `@anglr/dynamic/relations-editor`
   - *relations editor* node based visual editor of relations via `RelationsEditorComponent` (canvas, nodes palette, properties editor)
   - `withRelationsEditor` core feature, `withRelationsDefaultsOverride`, `withStaticComponents` features
   - `RelationsEditorMetadata` decorator, `RelationsNode`, `RelationsNodeBase`, `RelationsNodeManager`, `RelationsNodeRendererDirective`
   - node building blocks `RelationsNodeHeaderComponent`, `RelationNodeInputComponent`, `RelationNodeOutputComponent`
   - `RelationsNodeMetadata`, whitelist and blacklist of nodes, zoomable canvas with scopes
- subpackage `@anglr/dynamic/relations-debugger`
   - *relations debugger* runtime debugging and visualization of relations data flow (`provideRelationsDebuggerImplementation`, `ShowRelationsDebuggerDirective`, `RelationsDebuggerVisualizerComponent`, `RELATIONS_DEBUGGER_RELATIONS_NODES_PROVIDER`)
   - debug variants of canvas, node inputs and outputs, `debuggerNode` relations node
- subpackage `@anglr/dynamic/layout-relations`
   - *layout relations* connecting layout components with relations, `withLayoutRelationsRuntime` and `withLayoutRelationsEditor` core features
   - layout components registered into relations and usable as nodes in relations editor
   - custom components and relations support (`withCustomComponents`, `withCustomRelations`, `CustomComponentsRegister`)
   - dynamic items `customComponent`, `customRelation`, `placeholder`, `placeholderContainer`, `componentInputs`, `componentOutputs`
- subpackage `@anglr/dynamic/form`
   - *form* dynamic forms built from layout, `FormComponentControlBuilder` builds `FormGroup` from layout metadata
   - `withFormComponents`, `withFormControlBuilder` features
   - `FormComponentBase`, `FormComponentOptions` base for form fields with `value` input and `valueOutput` relations output
   - dynamic items `formGroup`, `textField`, `numberField`, `textarea`, `checkbox`, `radio`, `select`, `datepicker`, `period`
- subpackage `@anglr/dynamic/basic-components`
   - *basic components* `withBasicComponents` feature
   - layout items `block`, `button`, `gridPanel`, `gridPanelArea`, `htmlBlock`, `ifBlock`, `listBlock`, `stackPanel`, `templateBlock`, `textBlock`, `toggleButton`
   - relations items `debounceValue`, `deconstruct`, `empty`, `firstNonNull`, `logicalAnd`, `logicalOr`, `match`, `merge`, `negation`, `state`, `syncValues`, `transformData`, `trigger`, `value`
   - *flex* child extension of `stackPanel`, `BUTTONS_PRESETS` token for button css class presets
- subpackage `@anglr/dynamic/material-components`
   - *material components* `withMaterialComponents` feature, Angular Material variants of form items
   - dynamic items `textField`, `numberField`, `textarea`, `checkbox`, `radio`, `select`, `datepicker`, `period`, `expansionPanel`, `tabGroup`, `tab`
   - requires `@angular/material`
- subpackage `@anglr/dynamic/css-components`
   - *css components* `withCssComponents` feature
   - dynamic item `styleBlock` for scoped styling of content
- subpackage `@anglr/dynamic/handlebars-components`
   - *handlebars components* `withHandlebarsComponents` feature
   - dynamic items `dataBlock`, `dataTemplate` rendering data using handlebars templates
- subpackage `@anglr/dynamic/rest-components`
   - *rest components* `withRestComponents` feature
   - dynamic item `rest` relations node for RESTful requests
   - requires `@anglr/rest`
- subpackage `@anglr/dynamic/tinymce-components`
   - *tinymce components* `withTinyMceComponents` feature
   - dynamic items `richTextBlock`, `richTextSource` for WYSIWYG edited formatted text
   - requires `tinymce`
- subpackage `@anglr/dynamic/math-components`
   - *math components* `withMathComponents` feature
   - relations items `add`, `subtract`, `multiply`, `divide`, `power`, `round`
- subpackage `@anglr/dynamic/grid-components`
   - *grid components* `withGridComponents` feature
   - dynamic items `dataTable`, `gridColumn`, `gridColumns`, `gridColumnHeader`, `gridColumnContent`
   - data loading items `dataLoader`, `asyncDataLoader`, `syncDataLoader`, paging items `paging`, `basicPaging`, `previousNextPaging`
   - metadata selection items `metadataSelector`, `dialogMetadataSelector`, `showMetadataSelectorButton`
   - requires `@anglr/grid`
