import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-tracked-team-item',
  templateUrl: './tracked-team-item.component.html',
  styleUrls: ['./tracked-team-item.component.css']
})

export class TrackedTeamItemComponent  {

    @Input() team: Team | undefined;
    @Output() teamIdUntrack = new EventEmitter<number>();

    onUntrack(teamId: number): void{
      this.teamIdUntrack.emit(+teamId);
    }

}
