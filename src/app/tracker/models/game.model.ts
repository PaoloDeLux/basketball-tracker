import { Team } from "./team.model"

export class Game {

  constructor(
    public id: number,
    public date: Date,
    public homeTeamScore:number,
    public visitorTeamScore:number,
    public season:number,
    public homeTeam : Team,
    public visitorTeam: Team
  )
  {
  }
}
