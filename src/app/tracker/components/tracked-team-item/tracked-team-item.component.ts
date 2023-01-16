import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-tracked-team-item',
  templateUrl: './tracked-team-item.component.html',
  styleUrls: ['./tracked-team-item.component.css']
})

export class TrackedTeamItemComponent implements OnInit {

  @Input() team: Team | undefined;

    ngOnInit(): void {

    }

}
