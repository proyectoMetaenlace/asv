import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceSettings } from "src/app/service-settings";
import { Competition } from "../../model/competition";


@Injectable({
    providedIn: 'root'
  })
  export class CompetitionService {
  
  
    constructor(private http: HttpClient,
        private settings: ServiceSettings) {
    }
  
    getAllCompetitions() {
      return this.http.get<any>('http://localhost:4200/target/api/competiciones/');
      return this.http.get<any>(`${this.settings.baseURL}equipos`);
    }

    getCompetition(id) {
        return this.http.get<any>('http://localhost:4200/target/api/competiciones/' + id);
        return this.http.get<any>(`${this.settings.baseURL}equipos/` + id);
    }

    createDayCompetition(competicion: Competition) {
        return this.http.post<any>('http://localhost:4200/target/api/compjor/', competicion);
    }

    createKnockoutCompetition(competicion: Competition) {
        return this.http.post<any>('http://localhost:4200/target/api/compelim/', competicion);
    }

    createDayKnockoutCompetition(competicion: Competition) {
        return this.http.post<any>('http://localhost:4200/target/api/compjorelim/', competicion);
    }
  
    updateDayCompetition(competicion: Competition) {
        return this.http.put<any>('http://localhost:4200/target/api/compjor/', competicion);
    }

    updateKnockoutCompetition(competicion: Competition) {
        return this.http.put<any>('http://localhost:4200/target/api/compelim/', competicion);
    }

    updateDayKnockoutCompetition(competicion: Competition) {
        return this.http.put<any>('http://localhost:4200/target/api/compjorelim/', competicion);
    }
  
    deleteTeam(ids: Array<number>) {
      //console.log('eliminando: ' + ids)
      //return this.httpClient.post<any>(`${this.apiendpoint() + ServiceSettings.URLSeparator + 'delete'}`, ids);
    }
  }
  