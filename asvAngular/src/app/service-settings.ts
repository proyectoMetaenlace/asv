import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceSettings {

    public baseURL: string;
    public version: string;
    public idle: number;
    public static get URLSeparator(): string { return "/"; }


    constructor(private httpClient: HttpClient) { }

    async load() : Promise<any>{
        const promise = this.httpClient.get(window.location.origin + '/api/ServiceSettings')
            .toPromise()
            .then(settings => {
                return settings;
            });

        return promise;
    }
}
