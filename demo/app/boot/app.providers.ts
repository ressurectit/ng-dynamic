import {FactoryProvider, ClassProvider, ValueProvider, Provider, ExistingProvider, EnvironmentProviders, inject, importProvidersFrom, provideZonelessChangeDetection} from '@angular/core';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter, withComponentInputBinding, withHashLocation} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {LocalPermanentStorage} from '@anglr/common/store';
import {PROGRESS_INTERCEPTOR_PROVIDER, GlobalizationService, DebugDataEnabledService, DEFAULT_NOTIFICATIONS, NOTIFICATIONS, providePosition, provideLoggerConfig, DeveloperConsoleSink, LogLevelEnricher, TimestampEnricher, LogLevel, ConsoleComponentSink, providePermanentStorage, provideStringLocalization} from '@anglr/common';
import {NgxTranslateStringLocalizationService} from '@anglr/translate-extensions';
import {ERROR_HANDLING_NOTIFICATIONS, HttpGatewayTimeoutInterceptorOptions, NoConnectionInterceptorOptions, HTTP_GATEWAY_TIMEOUT_INTERCEPTOR_PROVIDER, NO_CONNECTION_INTERCEPTOR_PROVIDER, SERVICE_UNAVAILABLE_INTERCEPTOR_PROVIDER, ANGLR_EXCEPTION_HANDLER_PROVIDER, HTTP_SERVER_ERROR_INTERCEPTOR_PROVIDER, CLIENT_ERROR_NOTIFICATIONS, provideAnglrExceptionExtenders, errorWithUrlExtender, provideInternalServerErrorRenderer, provideHttpClientErrorResponseMapper, provideHttpClientValidationErrorResponseMapper, provideHttpClientErrorHandlers, handleHttp404Error, provideHttpClientErrorConfigs} from '@anglr/error-handling';
import {DialogInternalServerErrorRenderer} from '@anglr/error-handling/material';
import {BasicPagingOptions, TableContentRendererOptions, HEADER_CONTENT_RENDERER_OPTIONS, TableHeaderContentRendererOptions, QueryPermanentStorageGridInitializerOptions, QueryGridInitializerComponent, provideGridInitializerType, provideMetadataSelectorType, provideNoDataRendererOptions, providePagingOptions, provideMetadataSelectorOptions, provideGridInitializerOptions, provideContentRendererOptions} from '@anglr/grid';
import {DialogMetadataSelectorOptions, DialogMetadataSelectorComponent} from '@anglr/grid/material';
import {ReservedSpaceValidationErrorsContainerComponent, ValidationErrorRendererFactoryOptions, VALIDATION_ERROR_MESSAGES, VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS} from '@anglr/common/forms';
import {MovableTitledDialogComponent, TitledDialogServiceOptions, TitledDialogService, provideConfirmationDialogOptions} from '@anglr/common/material';
import {FloatingUiDomPosition} from '@anglr/common/floating-ui';
import {CatchHttpClientErrorMiddleware, HttpClientErrorProcessingMiddleware, REST_ERROR_HANDLING_MIDDLEWARE_ORDER} from '@anglr/error-handling/rest';
import {NORMAL_STATE_OPTIONS, NormalStateOptions} from '@anglr/select';
import {provideGlobalNotifications} from '@anglr/notifications';
import {baseUrlExtension} from '@anglr/md-help/baseurl';
import {assetsPathPrefixExtension, GfmHeadingIdExtension, IncludeMarkdownExtension, provideMarkdownRendererExtensions} from '@anglr/md-help';
import {HighlightJsExtension} from '@anglr/md-help/highlightjs';
import {MermaidExtension} from '@anglr/md-help/mermaid';
import {DATE_API} from '@anglr/datetime';
import {DateFnsDateApi, DateFnsLocale, DATE_FNS_DATE_API_OBJECT_TYPE, DATE_FNS_FORMAT_PROVIDER, DATE_FNS_LOCALE} from '@anglr/datetime/date-fns';
import {LoggerMiddleware, MockLoggerMiddleware, ReportProgressMiddleware, ResponseTypeMiddleware, provideRestMethodMiddlewares} from '@anglr/rest';
import {provideRestDateTime} from '@anglr/rest/datetime';
import {provideRelationsDebuggerImplementation} from '@anglr/dynamic/relations-debugger';
import {isString} from '@jscrpt/common';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {DndModule} from '@ng-dnd/core';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {sk} from 'date-fns/locale';

import {routes} from './app.component.routes';
import {config} from '../config';
import {GlobalizationService as GlobalizationServiceImpl} from '../services/globalization/globalization.service';
import {NOTHING_SELECTED} from '../misc/constants';
import {SettingsService, LocalSettingsStorage} from '../services/settings';
import {SETTINGS_STORAGE} from '../misc/tokens';
import {WebpackTranslateLoaderService} from '../services/webpackTranslateLoader';
import {ReportMissingTranslationService} from '../services/missingTranslation';

/**
 * Array of providers that are used in app module
 */
export const appProviders: (Provider|EnvironmentProviders)[] =
[
    //######################### ROUTER #########################
    provideRouter(routes,
                  withComponentInputBinding(),
                  withHashLocation()),

    //######################### CLIENT HYDRATION #########################
    provideClientHydration(),

    //######################### HTTP CLIENT #########################
    provideHttpClient(withInterceptorsFromDi(),),

    //######################### ZONELESS #########################
    provideZonelessChangeDetection(),

    //######################### TRANSLATIONS #########################
    importProvidersFrom(TranslateModule.forRoot(
    {
        loader: <ClassProvider>
        {
            provide: TranslateLoader,
            useClass: WebpackTranslateLoaderService,
        },
        ...config.configuration.debugTranslations ?
            {
                missingTranslationHandler:
            {
                provide: MissingTranslationHandler,
                useClass: ReportMissingTranslationService,
            }
            } :
            {
            },
        useDefaultLang: !config.configuration.debugTranslations
    })),

    //######################### HTTP INTERCEPTORS #########################
    HTTP_GATEWAY_TIMEOUT_INTERCEPTOR_PROVIDER,
    SERVICE_UNAVAILABLE_INTERCEPTOR_PROVIDER,
    HTTP_SERVER_ERROR_INTERCEPTOR_PROVIDER,
    NO_CONNECTION_INTERCEPTOR_PROVIDER,
    PROGRESS_INTERCEPTOR_PROVIDER,

    //######################### NO CONNECTION INTERCEPTOR OPTIONS #########################
    <FactoryProvider>
    {
        useFactory: () => new NoConnectionInterceptorOptions('Server je mimo prevádzky.'),
        provide: NoConnectionInterceptorOptions
    },

    //######################### HTTP GATEWAY TIMEOUT INTERCEPTOR OPTIONS #########################
    <FactoryProvider>
    {
        useFactory: () => new HttpGatewayTimeoutInterceptorOptions('Server neodpovedal v stanovenom čase.'),
        provide: HttpGatewayTimeoutInterceptorOptions
    },

    //######################### GLOBALIZATION SERVICE #########################
    <ClassProvider>
    {
        provide: GlobalizationService,
        useClass: GlobalizationServiceImpl
    },

    //######################### ERROR HANDLING #########################
    provideAnglrExceptionExtenders(
    [
        errorWithUrlExtender,
    ]),
    ANGLR_EXCEPTION_HANDLER_PROVIDER,
    provideInternalServerErrorRenderer(DialogInternalServerErrorRenderer),

    //######################### GRID GLOBAL OPTIONS #########################
    provideGridInitializerType(QueryGridInitializerComponent),
    provideMetadataSelectorType(DialogMetadataSelectorComponent),
    provideNoDataRendererOptions(
    {
        texts:
        {
            loading: 'Nahrávam dáta ...',
            noData: 'Neboli nájdené dáta odpovedajúce zadaným parametrom',
            notLoaded: 'Neboli načítané žiadne dáta zatiaľ'
        }
    }),
    providePagingOptions<BasicPagingOptions>(
    {
        itemsPerPageValues: [15, 30, 60],
        initialItemsPerPage: 15
    }),
    provideMetadataSelectorOptions<DialogMetadataSelectorOptions>(
    {
        showButtonVisible: false
    }),
    provideGridInitializerOptions<QueryPermanentStorageGridInitializerOptions>(
    {
        storageIppName: 'all-grid-ipp'
    }),
    provideContentRendererOptions<TableContentRendererOptions>(
    {
        cssClasses:
        {
            containerDiv: 'table-container thin-scrollbar'
        }
    }),
    <ValueProvider>
    {
        provide: HEADER_CONTENT_RENDERER_OPTIONS,
        useValue: <TableHeaderContentRendererOptions>
        {
            cssClasses:
            {
                thDefault: 'header-default fixed-header'
            }
        }
    },

    //############################ SELECT GLOBAL OPTIONS ############################
    <ValueProvider>
    {
        provide: NORMAL_STATE_OPTIONS,
        useValue: <NormalStateOptions>
        {
            cssClasses:
            {
                normalStateElement: 'form-control-select',
            },
            texts:
            {
                nothingSelected: NOTHING_SELECTED,
            },
        },
    },

    //######################### STRING LOCALIZATION #########################
    provideStringLocalization(NgxTranslateStringLocalizationService),

    //######################### PERMANENT STORAGE #########################
    providePermanentStorage(LocalPermanentStorage),

    //######################### LOGGER #########################
    provideLoggerConfig(config => config
        .writeTo(cfg => cfg.writeTo(ConsoleComponentSink)
            .minimumLevel(() =>
            {
                const settings = inject(SettingsService);

                return () => LogLevel[settings.settingsLogging.consoleLogLevel as keyof typeof LogLevel];
            }))
        //Relations logger
        .writeTo(cfg => cfg.writeTo(DeveloperConsoleSink)
            .minimumLevel(LogLevel.Off)
            .filter((_, log) => !!log.message.match(/^(?:)RelationsProcessor|RelationsChangeDetector/)))
        //Layout logger
        .writeTo(cfg => cfg.writeTo(DeveloperConsoleSink)
            .minimumLevel(LogLevel.Off)
            .filter((_, log) => !!log.message.match(/^(?:)LayoutComponentRendererDirective|LayoutRenderer|LayoutEditorRenderer|LayoutDesignerComponent/)))
        //Dynamic logger
        .writeTo(cfg => cfg.writeTo(DeveloperConsoleSink)
            .minimumLevel(LogLevel.Off)
            .filter((_, log) => !!log.message.match(/^(?:)BasicDynamicModuleItemsProvider|defaultExportExtractor|extensionsExportsExtractor|DynamicItemLoader/)))
        .writeTo(DeveloperConsoleSink)
        .enrichWith(LogLevelEnricher)
        .enrichWith(TimestampEnricher)
        .minimumLevel(LogLevel.Error)
        .messageTemplate('{{timestamp}} [{{logLevel}}] {{messageLog}}')),

    //######################### SETTINGS STORAGE #########################
    <ClassProvider>
    {
        provide: SETTINGS_STORAGE,
        useClass: LocalSettingsStorage
    },

    //######################### DEBUG DATA #########################
    <FactoryProvider>
    {
        provide: DebugDataEnabledService,
        useFactory: () =>
        {
            const settingsSvc: SettingsService = inject(SettingsService);
            const debugDataEnabled = new DebugDataEnabledService();

            debugDataEnabled.setEnabled(settingsSvc.settingsDebugging?.debugData);

            return debugDataEnabled;
        },
    },

    //######################### DATE API #########################
    <ClassProvider>
    {
        provide: DATE_API,
        useClass: DateFnsDateApi
    },
    DATE_FNS_FORMAT_PROVIDER,
    DATE_FNS_DATE_API_OBJECT_TYPE,
    <ValueProvider>
    {
        provide: DATE_FNS_LOCALE,
        useValue: <DateFnsLocale>
        {
            locale: sk
        }
    },

    //######################### VALIDATION ERRORS #########################
    <ValueProvider>
    {
        provide: VALIDATION_ERROR_MESSAGES,
        useValue:
        {
            required: 'Položka je povinná.',
            number: 'Položka musí byť číslo.',
            pattern: 'Položka nie je v požadovanom formáte.',
            minValue: 'Nedodržaná minimálna povolená hodnota.',
            maxValue: 'Nedodržaná maximálna povolená hodnota.',
            minlength: 'Nedodržaná minimálna dĺžka.',
            maxlength: 'Nedodržaná maximálna dĺžka.',
            birthNumber: 'Nesprávny formát rodného čísla.',
            email: 'Položka musí byť email.',
            availableUsername: 'Prihlasovacie meno je použité',
        }
    },
    <ValueProvider>
    {
        provide: VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS,
        useValue: <ValidationErrorRendererFactoryOptions>
        {
            container: ReservedSpaceValidationErrorsContainerComponent
        }
    },

    //######################### NOTIFICATIONS #########################
    provideGlobalNotifications(),
    DEFAULT_NOTIFICATIONS,
    <ExistingProvider>
    {
        provide: ERROR_HANDLING_NOTIFICATIONS,
        useExisting: NOTIFICATIONS
    },
    <ExistingProvider>
    {
        provide: CLIENT_ERROR_NOTIFICATIONS,
        useExisting: NOTIFICATIONS
    },

    //######################### TITLED DIALOG #########################
    importProvidersFrom(MatDialogModule),
    TitledDialogService,
    <ValueProvider>
    {
        provide: TitledDialogServiceOptions,
        useValue: new TitledDialogServiceOptions(MovableTitledDialogComponent),
    },

    //######################### CONFIRMATION DIALOG #########################
    provideConfirmationDialogOptions(
    {
        cssClasses:
        {
            closeButton: 'btn btn-danger margin-right-small',
        },
        confirmationText: 'Prajete si pokračovať?',
        dialogCancelText: 'Nie',
        dialogConfirmText: 'Áno',
    }),

    //######################### POSITION #########################
    providePosition(FloatingUiDomPosition),

    //######################### MARKDOWN #########################
    provideMarkdownRendererExtensions(GfmHeadingIdExtension,
                                      HighlightJsExtension,
                                      baseUrlExtension('pomoc/'),
                                      MermaidExtension,
                                      assetsPathPrefixExtension('md'),
                                      IncludeMarkdownExtension,),

    //######################### REST CONFIG #########################
    provideRestDateTime(),
    REST_ERROR_HANDLING_MIDDLEWARE_ORDER,
    provideRestMethodMiddlewares(
    [
        LoggerMiddleware,
        ResponseTypeMiddleware,
        ReportProgressMiddleware,
        HttpClientErrorProcessingMiddleware,
        CatchHttpClientErrorMiddleware,
        ...jsDevMode ? [...config.configuration.disableMockLogger ? [] : [MockLoggerMiddleware]] : [],
    ]),
    provideHttpClientErrorResponseMapper(err =>
    {
        if(err?.error?.errors)
        {
            return err?.error?.errors;
        }

        if(isString(err?.error))
        {
            return [err?.error];
        }

        return [];
    }),
    provideHttpClientValidationErrorResponseMapper(err =>
    {
        if(err?.error?.validationErrors)
        {
            return err?.error?.validationErrors;
        }

        return null;
    }),
    provideHttpClientErrorConfigs(
    {
        400:
        {
            message: 'Chyba spracovania dát!',
        },
        404:
        {
            message: 'Záznam pre požadované ID sa nenašiel!',
        },
    }),
    provideHttpClientErrorHandlers(
    {
        404: handleHttp404Error,
    }),
    provideRelationsDebuggerImplementation(),
    importProvidersFrom(DndModule.forRoot(
    {
        backend: HTML5Backend
    })),
];
