import {PlayoffJourneyCompetitionDTO, TeamDTO } from "asv-api-client";

export class PlayoffJourneyCompetitionViewDTO implements PlayoffJourneyCompetitionDTO {
    competitionYear?: number;
    id?: number;
    journey?: string;
    name?: string;
    playoff?: string;
    teamsDTO?: Array<TeamDTO>;
}