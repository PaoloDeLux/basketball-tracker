import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { TeamsService } from './services/teams.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html'
})
export class TrackerComponent  implements OnInit, OnDestroy {
  private _trackedTeamsSubscription: Subscription;
  private _teamsSubscription: Subscription;

  constructor(private _teamsService:TeamsService) {
    this._trackedTeamsSubscription = new Subscription();
    this._teamsSubscription = new Subscription();
  }

  ngOnInit(): void {
    this._teamsService.fetchTeams().pipe(take(1)).subscribe();;
    this._trackedTeamsSubscription = this._teamsService.retrieveTrackedTeams().pipe(take(1)).subscribe();
  }

  ngOnDestroy(): void {
    this._trackedTeamsSubscription.unsubscribe();
    this._teamsSubscription.unsubscribe();
  }
}
