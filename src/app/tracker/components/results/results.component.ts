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
    private router: Router,
    private route: ActivatedRoute,
    private teamsService: TeamsService
  ) {
    this.team$ = new Observable();
    this.teamCode$ = new Observable();
   }

  ngOnInit() {
    this.team$ = this.route.params.pipe(
      map((params) => params['teamCode']),
      mergeMap((teamCode)=> {
        return this.teamsService.getTeams().pipe(
          take(1),
          map((teams)=> {
            return teams.find((t)=> { return t.id === +teamCode!})
          })
        )
      })
    );
  }

}
