import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, Observable, take, } from 'rxjs';
import { Team } from '../../models/team.model';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public team$: Observable<Team|undefined>;
  public teamCode$: Observable<String|undefined>;

  constructor(
    private _route: ActivatedRoute,
    private _teamsService: TeamsService
  ) {
    this.team$ = new Observable();
    this.teamCode$ = new Observable();
   }

  ngOnInit() {
    this.team$ = this._route.params.pipe(
      map((params) => params['teamCode']),
      mergeMap((teamCode)=> {
        return this._teamsService.getTrackedTeams().pipe(
          map((teams)=> {
            return teams.find((t)=> { return t.id === +teamCode!})
          })
        )
      })
    );
  }

}
