import { Component } from '@angular/core';
import { delay, Observable, tap } from 'rxjs';
import { Team } from '../../models/team.model';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-tracked-teams-list',
  templateUrl: './tracked-teams-list.component.html'
})
export class TrackedTeamsListComponent {

  public trackedTeams$: Observable<Team[]>;
  public noTrackedTeams : boolean;

  constructor(private _teamsService: TeamsService){
    this.trackedTeams$ = new Observable();
    this.noTrackedTeams = false;
  }

  ngOnInit(): void {
    this.trackedTeams$ = this._teamsService.getTrackedTeams().pipe(
      tap((teams)=> {
          this.noTrackedTeams = teams.length===0? true : false;
      }),
      delay(700),
);
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
