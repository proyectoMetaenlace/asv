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

import { PlayoffJourneyCompetitionDTO } from '../model/playoffJourneyCompetitionDTO';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class PlayoffJourneyCompetitionControllerService {

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
     * createPlayoffJourneyCompetition
     * 
     * @param body competitionDTO
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createPlayoffJourneyCompetitionUsingPOST(body: PlayoffJourneyCompetitionDTO, observe?: 'body', reportProgress?: boolean): Observable<PlayoffJourneyCompetitionDTO>;
    public createPlayoffJourneyCompetitionUsingPOST(body: PlayoffJourneyCompetitionDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PlayoffJourneyCompetitionDTO>>;
    public createPlayoffJourneyCompetitionUsingPOST(body: PlayoffJourneyCompetitionDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PlayoffJourneyCompetitionDTO>>;
    public createPlayoffJourneyCompetitionUsingPOST(body: PlayoffJourneyCompetitionDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createPlayoffJourneyCompetitionUsingPOST.');
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

        return this.httpClient.request<PlayoffJourneyCompetitionDTO>('post',`${this.basePath}/api/playoffJourneyCompetitions`,
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
     * deletePlayoffJourneyCompetition
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deletePlayoffJourneyCompetitionUsingDELETE(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deletePlayoffJourneyCompetitionUsingDELETE(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deletePlayoffJourneyCompetitionUsingDELETE(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deletePlayoffJourneyCompetitionUsingDELETE(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deletePlayoffJourneyCompetitionUsingDELETE.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/api/playoffJourneyCompetitions/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllPlayoffJourneyCompetitions
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllPlayoffJourneyCompetitionsUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<PlayoffJourneyCompetitionDTO>>;
    public getAllPlayoffJourneyCompetitionsUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PlayoffJourneyCompetitionDTO>>>;
    public getAllPlayoffJourneyCompetitionsUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PlayoffJourneyCompetitionDTO>>>;
    public getAllPlayoffJourneyCompetitionsUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<Array<PlayoffJourneyCompetitionDTO>>('get',`${this.basePath}/api/playoffJourneyCompetitions`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getPlayoffJourneyCompetition
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getPlayoffJourneyCompetitionUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<PlayoffJourneyCompetitionDTO>;
    public getPlayoffJourneyCompetitionUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PlayoffJourneyCompetitionDTO>>;
    public getPlayoffJourneyCompetitionUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PlayoffJourneyCompetitionDTO>>;
    public getPlayoffJourneyCompetitionUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getPlayoffJourneyCompetitionUsingGET.');
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

        return this.httpClient.request<PlayoffJourneyCompetitionDTO>('get',`${this.basePath}/api/playoffJourneyCompetitions/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * updatePlayoffJourneyCompetition
     * 
     * @param body competitionDTO
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updatePlayoffJourneyCompetitionUsingPUT(body: PlayoffJourneyCompetitionDTO, id: number, observe?: 'body', reportProgress?: boolean): Observable<PlayoffJourneyCompetitionDTO>;
    public updatePlayoffJourneyCompetitionUsingPUT(body: PlayoffJourneyCompetitionDTO, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PlayoffJourneyCompetitionDTO>>;
    public updatePlayoffJourneyCompetitionUsingPUT(body: PlayoffJourneyCompetitionDTO, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PlayoffJourneyCompetitionDTO>>;
    public updatePlayoffJourneyCompetitionUsingPUT(body: PlayoffJourneyCompetitionDTO, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updatePlayoffJourneyCompetitionUsingPUT.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updatePlayoffJourneyCompetitionUsingPUT.');
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

        return this.httpClient.request<PlayoffJourneyCompetitionDTO>('put',`${this.basePath}/api/playoffJourneyCompetitions/${encodeURIComponent(String(id))}`,
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
