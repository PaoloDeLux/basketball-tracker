import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { TeamsService } from './services/teams.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent  implements OnInit, OnDestroy {
  private _trackedTeamsSubscription: Subscription;

  constructor(private teamsService:TeamsService) {
    this._trackedTeamsSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.teamsService.fetchTeams();
    this._trackedTeamsSubscription = this.teamsService.retrieveTrackedTeams().pipe(take(1)).subscribe();
  }

  ngOnDestroy(): void {
    this._trackedTeamsSubscription.unsubscribe();
  }
}
