import {FactoryProvider, ClassProvider, ValueProvider, Provider, ExistingProvider, EnvironmentProviders, inject, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter, withComponentInputBinding, withHashLocation} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {LocalPermanentStorage} from '@anglr/common/store';
import {PROGRESS_INTERCEPTOR_PROVIDER, GlobalizationService, STRING_LOCALIZATION, PERMANENT_STORAGE, DebugDataEnabledService, DEFAULT_NOTIFICATIONS, NOTIFICATIONS, providePosition, provideLoggerConfig, DeveloperConsoleSink, LogLevelEnricher, TimestampEnricher, LogLevel, ConsoleComponentSink} from '@anglr/common';
import {NgxTranslateStringLocalizationService} from '@anglr/translate-extensions';
import {ERROR_HANDLING_NOTIFICATIONS, HttpGatewayTimeoutInterceptorOptions, NoConnectionInterceptorOptions, HTTP_GATEWAY_TIMEOUT_INTERCEPTOR_PROVIDER, NO_CONNECTION_INTERCEPTOR_PROVIDER, SERVICE_UNAVAILABLE_INTERCEPTOR_PROVIDER, ANGLR_EXCEPTION_HANDLER_PROVIDER, ERROR_WITH_URL_EXTENDER, HTTP_SERVER_ERROR_INTERCEPTOR_PROVIDER, CLIENT_ERROR_NOTIFICATIONS, handle404Func, HttpClientErrorResponseMapper, HttpClientValidationErrorResponseMapper, HTTP_CLIENT_ERROR_RESPONSE_MAPPER, HTTP_CLIENT_VALIDATION_ERROR_RESPONSE_MAPPER, RestNotFoundError} from '@anglr/error-handling';
import {DIALOG_INTERNAL_SERVER_ERROR_RENDERER_PROVIDER} from '@anglr/error-handling/material';
import {NO_DATA_RENDERER_OPTIONS, NoDataRendererOptions, PAGING_OPTIONS, BasicPagingOptions, CONTENT_RENDERER_OPTIONS, TableContentRendererOptions, HEADER_CONTENT_RENDERER_OPTIONS, TableHeaderContentRendererOptions, GRID_INITIALIZER_TYPE, GRID_INITIALIZER_OPTIONS, QueryPermanentStorageGridInitializerOptions, QueryGridInitializerComponent} from '@anglr/grid';
import {ReservedSpaceValidationErrorsContainerComponent, ValidationErrorRendererFactoryOptions, VALIDATION_ERROR_MESSAGES, VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS} from '@anglr/common/forms';
import {ConfirmationDialogOptions, CONFIRMATION_DIALOG_OPTIONS, MovableTitledDialogComponent, TitledDialogServiceOptions, TitledDialogService} from '@anglr/common/material';
import {FloatingUiDomPosition} from '@anglr/common/floating-ui';
import {MD_HELP_NOTIFICATIONS, RenderMarkdownConfig, RENDER_MARKDOWN_CONFIG} from '@anglr/md-help/web';
import {ClientErrorHandlingMiddleware, HttpClientErrorCustomHandlerDef, HTTP_CLIENT_ERROR_CUSTOM_HANDLER, REST_ERROR_HANDLING_MIDDLEWARE_ORDER} from '@anglr/error-handling/rest';
import {NORMAL_STATE_OPTIONS, NormalStateOptions} from '@anglr/select';
import {provideGlobalNotifications} from '@anglr/notifications';
import {DATE_API} from '@anglr/datetime';
import {DateFnsDateApi, DateFnsLocale, DATE_FNS_DATE_API_OBJECT_TYPE, DATE_FNS_FORMAT_PROVIDER, DATE_FNS_LOCALE} from '@anglr/datetime/date-fns';
import {ReportProgressMiddleware, ResponseTypeMiddleware, REST_METHOD_MIDDLEWARES} from '@anglr/rest';
import {DATETIME_REST_DATE_API} from '@anglr/rest/datetime';
import {provideRelationsDebuggerImplementation} from '@anglr/dynamic/relations-debugger';
import {isString, isJsObject} from '@jscrpt/common';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {DndModule} from '@ng-dnd/core';
import {sk} from 'date-fns/locale';
import {HTML5Backend} from 'react-dnd-html5-backend';

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

    //######################### ZONE #########################
    provideZoneChangeDetection({eventCoalescing: true, runCoalescing: true}),

    //######################### TRANSLATIONS #########################
    importProvidersFrom(TranslateModule.forRoot(
        {
            loader: <ClassProvider>
        {
            provide: TranslateLoader, 
            useClass: WebpackTranslateLoaderService
        },
            ...config.configuration.debugTranslations ? 
                {
                    missingTranslationHandler:
                {
                    provide: MissingTranslationHandler,
                    useClass: ReportMissingTranslationService
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
    ERROR_WITH_URL_EXTENDER,
    ANGLR_EXCEPTION_HANDLER_PROVIDER,
    DIALOG_INTERNAL_SERVER_ERROR_RENDERER_PROVIDER,

    //######################### GRID GLOBAL OPTIONS #########################
    <ValueProvider>
    {
        provide: NO_DATA_RENDERER_OPTIONS,
        useValue: <NoDataRendererOptions>
        {
            texts:
            {
                loading: 'Nahrávam dáta ...',
                noData: 'Neboli nájdené dáta odpovedajúce zadaným parametrom',
                notLoaded: 'Neboli načítané žiadne dáta zatiaľ'
            }
        }
    },
    <ValueProvider>
    {
        provide: GRID_INITIALIZER_TYPE,
        useValue: QueryGridInitializerComponent
    },
    <ValueProvider>
    {
        provide: PAGING_OPTIONS,
        useValue: <BasicPagingOptions>
        {
            itemsPerPageValues: [15, 30, 60],
            initialItemsPerPage: 15
        }
    },
    <ValueProvider>
    {
        provide: GRID_INITIALIZER_OPTIONS,
        useValue: <QueryPermanentStorageGridInitializerOptions>
        {
            storageIppName: 'all-grid-ipp'
        }
    },
    <ValueProvider>
    {
        provide: CONTENT_RENDERER_OPTIONS,
        useValue: <TableContentRendererOptions>
        {
            cssClasses:
            {
                containerDiv: 'table-container thin-scrollbar'
            }
        }
    },
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
            texts:
            {
                nothingSelected: NOTHING_SELECTED
            }
        }
    },

    //######################### STRING LOCALIZATION #########################
    //TODO
    <ClassProvider>
    {
        provide: STRING_LOCALIZATION,
        useClass: NgxTranslateStringLocalizationService
    },

    //######################### PERMANENT STORAGE #########################
    //TODO
    <ClassProvider>
    {
        provide: PERMANENT_STORAGE,
        useClass: LocalPermanentStorage
    },

    //######################### LOGGER #########################
    provideLoggerConfig(config => config
        .writeTo(cfg => cfg.writeTo(ConsoleComponentSink)
            .minimumLevel(() =>
            {
                const settings = inject(SettingsService);

                return () => LogLevel[settings.settingsLogging.consoleLogLevel as keyof typeof LogLevel];
            }))
        .writeTo(DeveloperConsoleSink)
        .enrichWith(LogLevelEnricher)
        .enrichWith(TimestampEnricher)
        .minimumLevel(LogLevel.Warning)
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
        provide: MD_HELP_NOTIFICATIONS,
        useExisting: NOTIFICATIONS
    },
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
        useValue: new TitledDialogServiceOptions(MovableTitledDialogComponent)
    },
    
    //######################### CONFIRMATION DIALOG #########################
    <ValueProvider>
    {
        provide: CONFIRMATION_DIALOG_OPTIONS,
        useValue: <ConfirmationDialogOptions>
        {
            confirmationText: 'Prajete si pokračovať?',
            dialogCancelText: 'Nie',
            dialogConfirmText: 'Áno'
        }
    },

    //######################### POSITION #########################
    providePosition(FloatingUiDomPosition),

    //######################### MARKDOWN #########################
    <ValueProvider>
    {
        provide: RENDER_MARKDOWN_CONFIG,
        useValue: <RenderMarkdownConfig>
        {
            assetsPathPrefix: 'dist/md',
            baseUrl: '/pomoc'
        }
    },

    //######################### REST CONFIG #########################
    DATETIME_REST_DATE_API,
    REST_ERROR_HANDLING_MIDDLEWARE_ORDER,
    <ValueProvider>
    {
        provide: REST_METHOD_MIDDLEWARES,
        useValue:
        [
            ResponseTypeMiddleware,
            ReportProgressMiddleware,
            ClientErrorHandlingMiddleware,
        ]
    },
    <ValueProvider>
    {
        provide: HTTP_CLIENT_ERROR_RESPONSE_MAPPER,
        useValue: <HttpClientErrorResponseMapper>(err => 
        {
            if(err?.error?.errors)
            {
                return err?.error?.errors;
            }

            if(isString(err?.error))
            {
                return [err?.error];
            }

            if(isJsObject(err?.error))
            {
                return [JSON.stringify(err?.error)];
            }
            
            return [err.message];
        })
    },
    <ValueProvider>
    {
        provide: HTTP_CLIENT_VALIDATION_ERROR_RESPONSE_MAPPER,
        useValue: <HttpClientValidationErrorResponseMapper>(err => 
        {
            if(err?.error?.validationErrors)
            {
                return err?.error?.validationErrors;
            }

            return null;
        })
    },
    <ValueProvider>
    {
        provide: HTTP_CLIENT_ERROR_CUSTOM_HANDLER,
        useValue: <Record<number, HttpClientErrorCustomHandlerDef>>
        {
            404: [handle404Func, error => new RestNotFoundError(error.errors)],
        },
    },
    provideRelationsDebuggerImplementation(),
    importProvidersFrom(DndModule.forRoot(
        {
            backend: HTML5Backend
        })),
];
