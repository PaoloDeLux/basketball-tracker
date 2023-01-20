import { Component, Input } from '@angular/core';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-tracked-team-title',
  templateUrl: './tracked-team-title.component.html'
})
export class TrackedTeamTitleComponent {

  @Input() team: Team | undefined;

}
