import { Team } from "./team.model"

export class Game {

  constructor(
    public id: number,
    public date: Date,
    public homeTeamScore:number,
    public visitorTeamScore:number,
    public season:number,
    public homeTeam : Team,
    public visitorTeam: Team,
  )
  {
  }

  get winnerTeamId(): number | null {
     if(this.homeTeam && this.visitorTeam){
        if(this.homeTeamScore > this.visitorTeamScore){
          return this.homeTeam.id;
        } else {
          return this.visitorTeam.id
        }
      }
      return null;
  }

}
