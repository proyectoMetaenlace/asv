import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceSettings } from "src/app/service-settings";
import { Team } from "../../model/team";


@Injectable({
    providedIn: 'root'
  })
  export class TeamService {
  
  
    constructor(private http: HttpClient,
        private settings: ServiceSettings) {
    }
  
    getAllTeams() {
      return this.http.get<any>('http://localhost:4200/target/api/equipos/');
      return this.http.get<any>(`${this.settings.baseURL}equipos`);
    }

    getTeam(id) {
        return this.http.get<any>('http://localhost:4200/target/api/equipos/' + id);
        return this.http.get<any>(`${this.settings.baseURL}equipos/` + id);
    }

    createTeam(equipo: Team) {
      return this.http.post<any>('http://localhost:4200/target/api/equipos/', equipo);
    }
  
    updateTeam(equipo: Team) {
      return this.http.put<any>('http://localhost:4200/target/api/equipos/', equipo);
    }
  
    deleteTeam(ids: Array<number>) {
      //console.log('eliminando: ' + ids)
      //return this.httpClient.post<any>(`${this.apiendpoint() + ServiceSettings.URLSeparator + 'delete'}`, ids);
    }
  }
  