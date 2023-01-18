import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './components/results/results.component';
import { TrackedTeamsGuard } from './guards/tracked-teams.guard';
import { TrackerComponent } from './tracker.component';

const routes: Routes = [
  { path: '', component: TrackerComponent },
  { path: 'results/:teamCode', component: ResultsComponent, canActivate: [TrackedTeamsGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrackerRoutingModule { }
