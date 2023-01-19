import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Team } from '../../models/team.model';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.css']
})
export class TeamSelectorComponent implements OnInit {

  public teams$: Observable<Team[]>;
  public teamIdToTrack! : number;
  public trackingWait : boolean;

  constructor(private _teamsService: TeamsService){
    this.teams$ = new Observable();
    this.trackingWait = false;
  }

  ngOnInit(): void {
    this.teams$ = this._teamsService.getTeams().pipe(
      // Default first team to track
      tap((teams: Team[])=> { teams && teams.length>0? this.teamIdToTrack = teams[0].id : null })
    );
  }

  public trackTeam(){
    this.trackingWait = true;
    this._teamsService.trackTeam(this.teamIdToTrack)
    .then(() => {
      // Successfully added
      this.trackingWait = false;
    })
    .catch((err) => {
      alert(err);
      this.trackingWait = false;
    });
  }

}
