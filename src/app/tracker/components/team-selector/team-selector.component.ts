import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../models/team.model';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.css']
})
export class TeamSelectorComponent implements OnInit {

  public teams$: Observable<Team[]>;

  constructor(private teamsService: TeamsService){
    this.teams$ = new Observable();
  }

  ngOnInit(): void {
    this.teams$ = this.teamsService.getTeams();
  }

}
