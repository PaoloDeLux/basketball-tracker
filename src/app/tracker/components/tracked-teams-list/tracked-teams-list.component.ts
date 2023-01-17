import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../models/team.model';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-tracked-teams-list',
  templateUrl: './tracked-teams-list.component.html',
  styleUrls: ['./tracked-teams-list.component.css']
})
export class TrackedTeamsListComponent {
  public trackedTeams$: Observable<Team[]>;

  constructor(private _teamsService: TeamsService){
    this.trackedTeams$ = new Observable();
  }

  ngOnInit(): void {
    this.trackedTeams$ = this._teamsService.getTrackedTeams();
  }

  public untrackTeam(teamId: number){
    this._teamsService.untrackTeam(teamId)
    .then(() => {
      // Successfully added
    })
    .catch((err) => {
      alert(err);
    });
  }

}
