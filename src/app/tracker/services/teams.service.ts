import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, mergeMap, Observable, shareReplay, Subject, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/team.model';
import { TeamsRequest } from '../models/teams-request.interface';
import { TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private teams$: Observable<Team[]>;
  private teams: Array<Team>;
  private trackedTeams$: Subject<Team[]>;
  private trackedTeams: Array<Team>;

  private URL = 'https://free-nba.p.rapidapi.com';

  constructor(private http: HttpClient) {
    this.teams$ = new Observable();
    this.trackedTeams$ = new Subject();
    this.trackedTeams = new Array<Team>();
    this.teams = new Array<Team>();
  }

  public init() : void {
    this.fetchTeams();
    this.fetchTrackedTeams();
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
        this.teams = teams;
        return teams;
      })
      //shareReplay(1),
    )
  }

  public trackTeam(teamId: number) : void {
        let team = this.teams.find((team)=> team.id === +teamId);
        if (team){
          this.trackedTeams.push(team);
          this.setTrackedTeams(this.trackedTeams);
        }
  }

  public fetchTrackedTeams() :void  {
    // this.teams$ = this.http.get<TeamsRequest>(this.URL + '/teams')
    // .pipe(
    //   map((res :TeamsRequest)=> {
    //     return res.data.map((team)=> {
    //       return new Team(team.id, team.abbreviation, team.conference, team.division, team.full_name, team.name, team.city);
    //     });
    //   }),
      //shareReplay(1),
    //)
  }

}
