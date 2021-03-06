/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { JourneyCompetitionDTO } from '../model/journeyCompetitionDTO';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class JourneyCompetitionControllerService {

    protected basePath = '//localhost:4200';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * createJourneyCompetition
     * 
     * @param body competitionDTO
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createJourneyCompetitionUsingPOST(body: JourneyCompetitionDTO, observe?: 'body', reportProgress?: boolean): Observable<JourneyCompetitionDTO>;
    public createJourneyCompetitionUsingPOST(body: JourneyCompetitionDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<JourneyCompetitionDTO>>;
    public createJourneyCompetitionUsingPOST(body: JourneyCompetitionDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<JourneyCompetitionDTO>>;
    public createJourneyCompetitionUsingPOST(body: JourneyCompetitionDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createJourneyCompetitionUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<JourneyCompetitionDTO>('post',`${this.basePath}/api/journeyCompetitions`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * deleteJourneyCompetition
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteJourneyCompetitionUsingDELETE(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteJourneyCompetitionUsingDELETE(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteJourneyCompetitionUsingDELETE(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteJourneyCompetitionUsingDELETE(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteJourneyCompetitionUsingDELETE.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/api/journeyCompetitions/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllJourneyCompetitions
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllJourneyCompetitionsUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<JourneyCompetitionDTO>>;
    public getAllJourneyCompetitionsUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<JourneyCompetitionDTO>>>;
    public getAllJourneyCompetitionsUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<JourneyCompetitionDTO>>>;
    public getAllJourneyCompetitionsUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<JourneyCompetitionDTO>>('get',`${this.basePath}/api/journeyCompetitions`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getJourneyCompetition
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getJourneyCompetitionUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<JourneyCompetitionDTO>;
    public getJourneyCompetitionUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<JourneyCompetitionDTO>>;
    public getJourneyCompetitionUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<JourneyCompetitionDTO>>;
    public getJourneyCompetitionUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getJourneyCompetitionUsingGET.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<JourneyCompetitionDTO>('get',`${this.basePath}/api/journeyCompetitions/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * updateJourneyCompetition
     * 
     * @param body competitionDTO
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateJourneyCompetitionUsingPUT(body: JourneyCompetitionDTO, id: number, observe?: 'body', reportProgress?: boolean): Observable<JourneyCompetitionDTO>;
    public updateJourneyCompetitionUsingPUT(body: JourneyCompetitionDTO, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<JourneyCompetitionDTO>>;
    public updateJourneyCompetitionUsingPUT(body: JourneyCompetitionDTO, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<JourneyCompetitionDTO>>;
    public updateJourneyCompetitionUsingPUT(body: JourneyCompetitionDTO, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateJourneyCompetitionUsingPUT.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateJourneyCompetitionUsingPUT.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<JourneyCompetitionDTO>('put',`${this.basePath}/api/journeyCompetitions/${encodeURIComponent(String(id))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
