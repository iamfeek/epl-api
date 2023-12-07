export type FindFixturesOptions = {
    fromDate: Date;
    skip: number;
    limit: number;
}

export type FixtureDTO = {
    id: number;
    homeTeam: string;
    awayTeam: string
    homeTeamScore: number;
    awayTeamScore: number;
    matchDateTime: Date
    tournament: string;
}