import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerRoutingModule } from './tracker-routing.module';
import { TrackerComponent } from './tracker.component';
import { TeamSelectorComponent } from './components/team-selector/team-selector.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TrackerComponent,
    TeamSelectorComponent,
    SpinnerComponent
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
