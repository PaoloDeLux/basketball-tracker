import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, retry, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Team } from '../models/team.model';
import { TeamsRequest } from '../models/teams-request.interface';
import { GamesRequest } from '../models/games-request.interface';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private teams$: Observable<Team[]>;
  private teams: Array<Team>;
  private trackedTeams$: BehaviorSubject<Team[]>;
  private trackedTeams: Array<Team>;

  private URL = 'https://free-nba.p.rapidapi.com';

  constructor(private http: HttpClient) {
    this.teams$ = new Observable();
    this.trackedTeams = new Array<Team>();
    this.trackedTeams$ = new BehaviorSubject(this.trackedTeams);
    this.teams = new Array<Team>();
  }

  public init() : void {
    this.fetchTeams();
  }

  public getTeams(){
    return this.teams$;
  }

  public getTrackedTeams(){
    return this.trackedTeams$;
  }

  private setTrackedTeams(trackedTeams : Team[]){
    this.trackedTeams$.next(trackedTeams);
  }


  public fetchTeams() :void  {
    this.teams$ = this.http.get<TeamsRequest>(this.URL + '/teams')
    .pipe(
      map((res :TeamsRequest)=> {
        let teams =  res.data.map((team)=> {
          return new Team(team.id, team.abbreviation, team.conference, team.division, team.full_name, team.name, team.city);
        });
        return teams;
      }),
      tap((res)=> {
        this.teams =res;
      })
    )
  }

  public fetchTeamGames(teamId: number) : Observable<Game[]>  {
    let queryParams = new HttpParams();
    // Last 12 days results, not today
    for(let i = 1; i<13; i++){
      let d = new Date();
      d.setDate(d.getDate() - i);
      queryParams = queryParams.append("dates[]",d.toISOString().slice(0, 10));
    }
    queryParams = queryParams.append("page",0);
    queryParams = queryParams.append("per_page",12);
    queryParams = queryParams.append("team_ids[]",teamId);
    return this.http.get<GamesRequest>(this.URL+ '/games',{params:queryParams})
    .pipe(
      map((res :GamesRequest)=> {
        let games =  res.data.map((game)=> {
          return new Game(game.id,game.date,game.home_team_score,game.visitor_team_score,game.season,game.home_team,game.visitor_team);
        });
        return games;
      })
    )
  }

  public trackTeam(teamId: number) : Promise<void> {
    return new Promise((resolve, reject) => {
      let team = this.teams.find((team)=> team.id === +teamId);
      if (team){
        //Team Games
        this.fetchTeamGames(teamId).subscribe({
          next: (games) => {
            team!.games = games;
            // Check team is already tracked
            if(!this.trackedTeams.find((t)=> t.id===+teamId)){
              this.trackedTeams.push(team!);
              this.setTrackedTeams(this.trackedTeams);
              resolve();
            }
            else {
              reject('The team is already tracked!');
            }
          },
          error: () => reject('Server side error!')
        });
      } else {
        reject('Server side error!');
      }
    });
  }

  public untrackTeam(teamId: number) : Promise<void> {
    return new Promise((resolve, reject) => {
      let teamIndex = this.trackedTeams.findIndex((team)=> team.id === +teamId);
      if (teamIndex !== undefined){
        this.trackedTeams.splice(teamIndex,1);
        this.setTrackedTeams(this.trackedTeams);
        resolve();
      } else {
        reject('The team is no longer tracked!')
      }
    });
  }


}
