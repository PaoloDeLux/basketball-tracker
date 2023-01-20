import { Component } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Team } from '../../models/team.model';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-tracked-teams-list',
  templateUrl: './tracked-teams-list.component.html'
})
export class TrackedTeamsListComponent {

  public trackedTeams$: Observable<Team[]>;

  constructor(private _teamsService: TeamsService){
    this.trackedTeams$ = new Observable();
  }

  ngOnInit(): void {
    this.trackedTeams$ = this._teamsService.getTrackedTeams().pipe(delay(300));
  }

  public trackBy(index:number, el:any): number {
    return el.id;
  }

  public untrackTeam(teamId: number): void{
    this._teamsService.untrackTeam(teamId)
    .then(() => {
      // Successfully untracked
    })
    .catch((err) => {
      alert(err);
    });
  }

}
