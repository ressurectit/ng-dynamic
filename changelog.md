# Changelog

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
