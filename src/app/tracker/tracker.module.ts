import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerRoutingModule } from './tracker-routing.module';
import { TrackerComponent } from './tracker.component';
import { TeamSelectorComponent } from './components/team-selector/team-selector.component';


@NgModule({
  declarations: [
    TrackerComponent,
    TeamSelectorComponent
  ],
  imports: [
    CommonModule,
    TrackerRoutingModule
  ],
  exports: [
    TrackerComponent
  ]
})
export class TrackerModule { }
