import { CompetitionDTO, TeamDTO } from "asv-api-client";
import { Competition } from "./competition";

export class Team {
    id: number;
    name: string;  
    country: string;
    nameHistoricalRivalTeam: string;
    shieldPhoto: string;  
    competitions: Array<Competition>;
    numChampionsLeague: number;
}

export class TeamViewDTO implements TeamDTO {
    competitionsDTO?: Array<CompetitionDTO>;
    country?: string;
    id?: number;
    idHistoricalRivalTeam?: number;
    name?: string;
    nameHistRivalTeam?: string;
    numChampionsLeague?: number;
    shieldPhoto?: string;
}