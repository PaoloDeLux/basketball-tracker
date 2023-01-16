import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/team.model';
import { TeamsRequest } from '../models/teams-request.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private teams$: Observable<Team[]>;
  private URL = 'https://free-nba.p.rapidapi.com';

  constructor(private http: HttpClient) {
    this.teams$ = new Observable();
  }

  public init() : void {
    this.fetchTeams();
  }

  public getTeams(){
    return this.teams$;
  }

  public fetchTeams() :void  {
    this.teams$ = this.http.get<TeamsRequest>(this.URL + '/teams')
    .pipe(
      map((res :TeamsRequest)=> {
        return res.data.map((team)=> {
          return new Team(team.id, team.abbreviation, team.conference, team.division, team.full_name, team.name, team.city);
        });
      }),
      shareReplay(1),
    )
  }

  public trackTeam(teamId: number) {

  }

  public fetchTrackedTeams() {

  }

}
