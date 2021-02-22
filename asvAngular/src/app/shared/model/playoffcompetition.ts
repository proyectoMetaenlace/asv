import { PlayoffCompetitionDTO, TeamDTO } from "asv-api-client";

export class PlayoffCompetitionViewDTO implements PlayoffCompetitionDTO {
    competitionYear?: number;
    id?: number;
    name?: string;
    playoff?: string;
    teamsDTO?: Array<TeamDTO>;
}