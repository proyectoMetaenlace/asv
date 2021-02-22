import { JourneyCompetitionDTO, TeamDTO } from "asv-api-client";

export class JourneyCompetitionViewDTO implements JourneyCompetitionDTO {
    competitionYear?: number;
    id?: number;
    journey?: string;
    name?: string;
    teamsDTO?: Array<TeamDTO>;
}