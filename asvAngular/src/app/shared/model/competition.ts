import { CompetitionDTO, TeamDTO } from "asv-api-client";

export class Competition {
  id: number;
  name: string;
  yearCompetition: number;
  idTeamWinner: string;
  nameWinner: string;
  type: string;
}


export class CompetitionViewDTO implements CompetitionDTO {
    competitionYear?: number;
    id?: number;
    name?: string;
    teamsDTO?: Array<TeamDTO>;
    nameWinner?: string;
    type?: string;
}
