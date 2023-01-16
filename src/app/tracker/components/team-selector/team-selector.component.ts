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
  public trackedTeams$: Observable<Team[]>;
  public teamIdToTrack! : number;

  constructor(private teamsService: TeamsService){
    this.teams$ = new Observable();
    this.trackedTeams$ = new Observable();
  }

  ngOnInit(): void {
    this.teams$ = this.teamsService.getTeams().pipe(
      // Default first team to track
      tap((teams: Team[])=> { teams && teams.length>0? this.teamIdToTrack = teams[0].id : null })
    );
  }

  public trackTeam(){
    console.log(this.teamIdToTrack);
  }

}
