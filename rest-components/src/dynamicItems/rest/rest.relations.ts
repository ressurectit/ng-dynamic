import {Injector, SimpleChanges} from '@angular/core';
import {HttpClient, HttpEventType, HttpParams, HttpRequest} from '@angular/common/http';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {LOGGER, Logger, ProgressIndicatorService} from '@anglr/common';
import {handleHeaderParam, handlePathParam, handleQueryObjectParam, handleQueryParam, mergeQueryObjectParamsWithHttpParams, QueryStringSerializer} from '@anglr/rest';
import {isBlank, isEmptyObject, StringDictionary} from '@jscrpt/common';
import {catchError} from 'rxjs/operators';
import {EMPTY, Subscription} from 'rxjs';

import {RestRelationsMetadataLoader} from './rest.metadata';
import {RestRelationsOptions} from './rest.options';

//TODO: add required to rest param

/**
 * Rest relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(RestRelationsMetadataLoader)
export class RestRelations implements RelationsComponent<RestRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: RestRelationsOptions|undefined|null;

    /**
     * Instance of http client
     */
    protected http: HttpClient;

    /**
     * Instance of logger
     */
    protected logger: Logger;

    /**
     * Instance of query string serializer
     */
    protected queryStringSerializer: QueryStringSerializer;

    /**
     * Subscription for running request
     */
    protected runningRequestSubscription: Subscription|undefined|null;

    /**
     * Service used for handling progress indicator
     */
    protected progressIndicator: ProgressIndicatorService;

    /**
     * Indication whether there is null or undefined required param
     */
    protected emptyParam: boolean[] = [];

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): RestRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: RestRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;

        this.initialize();
    }

    //######################### public properties - dynamic outputs #########################

    /**
     * Success output for rest result
     */
    @DynamicOutput()
    public success: unknown;

    /**
     * Error output for rest result
     */
    @DynamicOutput()
    public error: unknown;

    //######################### constructor #########################
    constructor(injector: Injector,)
    {
        this.http = injector.get(HttpClient);
        this.logger = injector.get(LOGGER);
        this.queryStringSerializer = injector.get(QueryStringSerializer);
        this.progressIndicator = injector.get(ProgressIndicatorService);
    }

    //######################### public methods - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public ngOnChanges(_changes: SimpleChanges): void
    {
        this.makeRequest();
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }

    //######################### protected methods #########################

    /**
     * Initialize rest relations
     */
    protected initialize(): void
    {
        if(this.relationsOptions)
        {
            if(this.relationsOptions.params && Array.isArray(this.relationsOptions.params))
            {
                for(const index in this.relationsOptions.params)
                {
                    const param = this.relationsOptions.params[index];
                    this.emptyParam.push(true);

                    if(param.configurable && param.name)
                    {
                        Object.defineProperty(this,
                                              param.name,
                                              {
                                                  configurable: true,
                                                  enumerable: true,
                                                  set: value =>
                                                  {
                                                      param.value = value;

                                                      this.emptyParam[index] = isBlank(value);
                                                  }
                                              });
                    }
                }
            }
        }

        if(this.relationsOptions?.runImmediately)
        {
            this.makeRequest();
        }
    }

    /**
     * Make http request
     */
    protected makeRequest(): void
    {
        //on empty param
        if(this.emptyParam.find(itm => itm))
        {
            return;
        }

        if(this.runningRequestSubscription)
        {
            this.runningRequestSubscription.unsubscribe();
            this.progressIndicator.hideProgress();
        }

        if(!this.relationsOptions ||
           !this.relationsOptions.method ||
           !this.relationsOptions.url)
        {
            this.logger.warn('RestRelations: missing options for craeting http request {@data}', this.relationsOptions);

            return;
        }

        let body: any = null;
        let url: string = this.relationsOptions.url;
        const params: StringDictionary = {};
        const headers: StringDictionary = {};
        const queryStrings: string[] = [];

        if(this.relationsOptions.params && Array.isArray(this.relationsOptions.params))
        {
            for(const param of this.relationsOptions.params)
            {
                if(!param.name)
                {
                    continue;
                }

                const data =
                {
                    index: 0,
                    key: param.name,
                    value: param.value,
                    transformFn: null
                };

                switch(param.type)
                {
                    case 'PATH':
                    {
                        url = handlePathParam(data, url);

                        break;
                    }
                    case 'BODY':
                    {
                        body = param.value;

                        break;
                    }
                    case 'QUERY':
                    {
                        handleQueryParam(data, params);

                        break;
                    }
                    case 'QUERY OBJECT':
                    {
                        handleQueryObjectParam(data, queryStrings, this.queryStringSerializer);

                        break;
                    }
                    case 'HEADER':
                    {
                        handleHeaderParam(data, headers);

                        break;
                    }
                    default:
                    {
                        break;
                    }
                }
            }
        }

        let request: HttpRequest<any> = new HttpRequest(this.relationsOptions.method,
                                                        url,
                                                        body,
                                                        {
                                                            reportProgress: false,
                                                            responseType: 'json',
                                                        });

        // query params
        if(!isEmptyObject(params))
        {
            request = request.clone(
            {
                setParams: params
            });
        }

        // header params
        if(!isEmptyObject(headers))
        {
            request = request.clone(
            {
                setHeaders: headers
            });
        }

        // query object params
        if(queryStrings.length)
        {
            const requestParams: HttpParams = mergeQueryObjectParamsWithHttpParams(queryStrings, request.params);

            request = request.clone(
            {
                params: requestParams
            });
        }

        this.runningRequestSubscription = this.http.request(request)
            .pipe(catchError(error =>
            {
                //TODO: proper handling
                this.success = null;
                this.error = error;

                return EMPTY;
            }))
            .subscribe(result =>
            {
                if(result.type == HttpEventType.Response)
                {
                    if(result.status >= 200 && result.status <= 300)
                    {
                        this.success = result.body;
                        this.error = null;

                        return;
                    }
                }
            });
    }
}