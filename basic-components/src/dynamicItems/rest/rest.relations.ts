import {Injector, SimpleChanges} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {LOGGER, Logger} from '@anglr/common';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

import {RestRelationsMetadataLoader} from './rest.metadata';
import {RestRelationsOptions} from './rest.options';
import {RestParam} from './misc/interfaces';

//TODO: maybe improve @anglr/rest and use same functionality here

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
    public success: any = {test: true};

    /**
     * Error output for rest result
     */
    @DynamicOutput()
    public error: any = null;

    //######################### constructor #########################
    constructor(injector: Injector,)
    {
        this.http = injector.get(HttpClient);
        this.logger = injector.get(LOGGER);
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
                for(const param of this.relationsOptions.params)
                {
                    if(param.configurable && param.name)
                    {
                        Object.defineProperty(this,
                                              param.name,
                                              {
                                                  configurable: true,
                                                  enumerable: true,
                                                  set: value => param.value = value
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
        if(!this.relationsOptions ||
           !this.relationsOptions.method ||
           !this.relationsOptions.url)
        {
            this.logger.warn('RestRelations: missing options for craeting http request {@data}', this.relationsOptions);

            return;
        }   

        let url: string = this.relationsOptions.url;
        // let body: any = null;
        const pathParams: RestParam[] = [];

        if(this.relationsOptions.params && Array.isArray(this.relationsOptions.params))
        {
            for(const param of this.relationsOptions.params)
            {
                switch(param.type)
                {
                    case 'PATH':
                    {
                        pathParams.push(param);

                        break;
                    }
                    default:
                    {
                        break;
                    }
                }
            }
        }

        //TODO: finish

        //process path params
        for(const pathParam of pathParams)
        {
            url = url.replace('{' + pathParam.name + '}', pathParam.value as string);
        }

        const request: HttpRequest<any> = new HttpRequest(this.relationsOptions.method,
                                                          url,
                                                          null,
                                                          {
                                                              reportProgress: false,
                                                              responseType: 'json',
                                                          });

        this.http.request(request)
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