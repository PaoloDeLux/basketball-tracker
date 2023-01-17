import { Component } from '@angular/core';
import { TeamsService } from './services/teams.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent {
  constructor(public teamsService:TeamsService) {
    teamsService.init();
  }
}
