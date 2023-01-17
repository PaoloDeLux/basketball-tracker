import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Team } from '../models/team.model';
import { TeamsRequest } from '../models/teams-request.interface';
import { GamesRequest } from '../models/games-request.interface';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private _teams$: Observable<Team[]>;
  private _teams: Array<Team>;
  private _trackedTeams$: BehaviorSubject<Team[]>;
  private _trackedTeams: Array<Team>;

  private URL = 'https://free-nba.p.rapidapi.com';

  constructor(private http: HttpClient) {
    this._teams$ = new Observable();
    this._trackedTeams = new Array<Team>();
    this._trackedTeams$ = new BehaviorSubject(this._trackedTeams);
    this._teams = new Array<Team>();
  }

  public init() : void {
    this.fetchTeams();
  }

  public getTeams(){
    return this._teams$;
  }

  public getTrackedTeams(){
    return this._trackedTeams$;
  }

  private setTrackedTeams(trackedTeams : Team[]){
    this._trackedTeams$.next(trackedTeams);
  }


  public fetchTeams() :void  {
    this._teams$ = this.http.get<TeamsRequest>(this.URL + '/teams')
    .pipe(
      map((res :TeamsRequest)=> {
        const teams =  res.data.map((team)=> {
          return new Team(team.id, team.abbreviation, team.conference, team.division, team.full_name, team.name, team.city);
        });
        return teams;
      }),
      tap((res)=> {
        this._teams =res;
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
        const games =  res.data.map((game)=> {
          return new Game(game.id,game.date,game.home_team_score,game.visitor_team_score,game.season,game.home_team,game.visitor_team);
        });
        return games;
      })
    )
  }

  public trackTeam(teamId: number) : Promise<void> {
    return new Promise((resolve, reject) => {
      const team = this._teams.find((team)=> team.id === +teamId);
      if (team){
        //Team Games
        this.fetchTeamGames(teamId).subscribe({
          next: (games) => {
            team!.games = games;
            // Check team is already tracked
            if(!this._trackedTeams.find((t)=> t.id===+teamId)){
              this._trackedTeams.push(team!);
              this.setTrackedTeams(this._trackedTeams);
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
      const teamIndex = this._trackedTeams.findIndex((team)=> team.id === +teamId);
      if (teamIndex !== undefined){
        this._trackedTeams.splice(teamIndex,1);
        this.setTrackedTeams(this._trackedTeams);
        resolve();
      } else {
        reject('The team is no longer tracked!')
      }
    });
  }


}
