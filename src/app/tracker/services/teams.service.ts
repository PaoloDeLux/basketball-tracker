import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, tap } from 'rxjs';
import { Team } from '../models/team.model';
import { TeamsRequest } from '../models/teams-request.interface';
import { GamesRequest } from '../models/games-request.interface';
import { Game } from '../models/game.model';
import { environment } from 'src/app/environments/environment';
import { DataService } from 'src/app/core/services/data-service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private _teams$: Observable<Team[]>;
  private _teams: Array<Team>;
  private _trackedTeams$: BehaviorSubject<Team[]>;
  private _trackedTeams: Array<Team>;

  constructor( private _dataService: DataService) {
    this._teams$ = new Observable();
    this._trackedTeams = new Array<Team>();
    this._trackedTeams$ = new BehaviorSubject(this._trackedTeams);
    this._teams = new Array<Team>();
  }

  public getTeams(){
    return this._teams$;
  }

  public getTrackedTeams(){
    return this._trackedTeams$;
  }

  public retrieveTrackedTeams(): Observable<Team[]>{
    const local =  localStorage.getItem('trackedTeams');
    // Update all results on tracked teams storage
    let localTracked : Team[] = [];
    const initLocalTracked = new Array<Team>();
    localTracked= local? (JSON.parse(local)) : null
    let subscriptions= new Array<Observable<Game[]>>();
    if(localTracked && localTracked.length>0){
      localTracked.forEach((t)=>{
        //Team Games
        subscriptions.push(this.fetchTeamGames(t.id).pipe(
          tap((games)=>{
            const team = localTracked.find((f)=> f.id === t.id);
            if(team){
              // For a new avg calculation need a new instance
              const newTeam = new Team(team.id,team.abbreviation,team.conference,team.division,team.fullname,team.name,team.city,team.trackingOrder);
              newTeam.games = games;
              initLocalTracked.push(newTeam);
            }
          })
        ));
      })
    }
    return forkJoin(subscriptions).pipe(
      map(()=>{
        this._trackedTeams = initLocalTracked.sort((a, b) => (a.trackingOrder! > b.trackingOrder!) ? 1 : -1)
        // Update live tracked teams
        this._trackedTeams$.next([...this._trackedTeams]);
        // Return of same list
        return this._trackedTeams;
      })
    );
  }

  private setTrackedTeams(trackedTeams : Team[]) : void {
    localStorage.setItem('trackedTeams',JSON.stringify(trackedTeams));
    this._trackedTeams$.next(trackedTeams);
  }


  public fetchTeams() :void  {
    this._teams$ = this._dataService.fetch<TeamsRequest>(environment.apiUrl + '/teams')
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
      const d = new Date();
      d.setDate(d.getDate() - i);
      queryParams = queryParams.append("dates[]",d.toISOString().slice(0, 10));
    }
    queryParams = queryParams.append("page",0);
    queryParams = queryParams.append("per_page",12);
    queryParams = queryParams.append("team_ids[]",teamId);
    return this._dataService.fetch<GamesRequest>(environment.apiUrl+ '/games',queryParams)
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
            if(team){
              team.games = games;
              // Check team is already tracked
              if(!this._trackedTeams.find((t)=> t.id===+teamId)){
                team.trackingOrder = this._trackedTeams.length;
                this._trackedTeams.push(team);
                this.setTrackedTeams(this._trackedTeams);
                resolve();
              }
              else {
                reject('The team is already tracked!');
              }
            }
            else {
              reject('Team not yet available!');
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
