import { Avg } from "./avg.interface";
import { Game } from "./game.model";

export class Team {

  public games: Array<Game>;
  public imgUrl: string | undefined;

  constructor(
    public id: number,
    public abbreviation: string,
    public conference: string,
    public division: string,
    public fullname: string,
    public name: string,
    public city: string,
    public trackingOrder?: number
    )    {
      this.games = new Array<Game>();
      if(abbreviation){
        this.imgUrl = 'https://interstate21.com/nba-logos/'+abbreviation+'.png';
      }
    }

    get  gamedAvg() : Avg {
      const avgResult = { score: 0, conceded: 0};
      if(this.games && this.games.length>0){
        const teamHomeGames = this.games.filter((t)=> t.homeTeam.id === this.id );
        const teamVisitorGames = this.games.filter((t)=>  t.visitorTeam.id === this.id );
        let sumScore = 0;
        let sumConceded = 0;
        if(teamHomeGames && teamHomeGames.length>0){
          for( var i = 0; i < teamHomeGames.length; i++ ){
            sumScore += teamHomeGames[i].homeTeamScore;
            sumConceded += teamHomeGames[i].visitorTeamScore;
        }
        }
        if(teamVisitorGames && teamVisitorGames.length>0){
          for( var i = 0; i < teamVisitorGames.length; i++ ){
            sumScore += teamVisitorGames[i].visitorTeamScore;
            sumConceded += teamVisitorGames[i].homeTeamScore;
          }
        }
        if(sumScore){
          avgResult.score = +(sumScore/(teamHomeGames?.length + teamVisitorGames?.length)).toFixed(2) ;
        }
        if(sumConceded){
          avgResult.conceded= +(sumConceded/(teamHomeGames?.length + teamVisitorGames?.length)).toFixed(2) ;
        }
      }
      return avgResult;
    }

}
