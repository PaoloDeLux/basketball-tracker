import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerRoutingModule } from './tracker-routing.module';
import { TrackerComponent } from './tracker.component';
import { TeamSelectorComponent } from './components/team-selector/team-selector.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { TrackedTeamsListComponent } from './components/tracked-teams-list/tracked-teams-list.component';
import { TrackedTeamItemComponent } from './components/tracked-team-item/tracked-team-item.component';
import { GamesStripComponent } from './components/results-strip/games-strip.component';
import { WinnerLoserTeamDirective } from './directives/winner-loser-team.directive';


@NgModule({
  declarations: [
    TrackerComponent,
    TeamSelectorComponent,
    SpinnerComponent,
    TrackedTeamsListComponent,
    TrackedTeamItemComponent,
    GamesStripComponent,
    WinnerLoserTeamDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    TrackerRoutingModule
  ],
  exports: [
    TrackerComponent
  ]
})
export class TrackerModule { }
