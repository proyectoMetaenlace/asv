import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { BasicErrorControllerService } from './api/basicErrorController.service';
import { CompetitionControllerService } from './api/competitionController.service';
import { JourneyCompetitionControllerService } from './api/journeyCompetitionController.service';
import { PlayoffCompetitionControllerService } from './api/playoffCompetitionController.service';
import { PlayoffJourneyCompetitionControllerService } from './api/playoffJourneyCompetitionController.service';
import { TeamControllerService } from './api/teamController.service';
import { UserControllerService } from './api/userController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    BasicErrorControllerService,
    CompetitionControllerService,
    JourneyCompetitionControllerService,
    PlayoffCompetitionControllerService,
    PlayoffJourneyCompetitionControllerService,
    TeamControllerService,
    UserControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<any> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
