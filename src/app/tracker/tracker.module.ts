import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerRoutingModule } from './tracker-routing.module';
import { TrackerComponent } from './tracker.component';
import { TeamSelectorComponent } from './components/team-selector/team-selector.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { TrackedTeamsListComponent } from './components/tracked-teams-list/tracked-teams-list.component';
import { TrackedTeamItemComponent } from './components/tracked-team-item/tracked-team-item.component';
import { WinnerLoserTeamDirective } from './directives/winner-loser-team.directive';
import { GamesStripComponent } from './components/games-strip/games-strip.component';
import { ResultsComponent } from './components/results/results.component';
import { ResultItemComponent } from './components/result-item/result-item.component';
import { TrackedTeamTitleComponent } from './components/tracked-team-title/tracked-team-title.component';
import { LoadingPipe } from './pipes/loading.pipe';


@NgModule({
  declarations: [
    TrackerComponent,
    TeamSelectorComponent,
    SpinnerComponent,
    TrackedTeamsListComponent,
    TrackedTeamItemComponent,
    GamesStripComponent,
    WinnerLoserTeamDirective,
    ResultsComponent,
    ResultItemComponent,
    TrackedTeamTitleComponent,
    LoadingPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    TrackerRoutingModule
  ]
})
export class TrackerModule { }
