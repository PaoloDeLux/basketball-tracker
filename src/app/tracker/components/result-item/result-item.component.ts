import { Component, Input } from '@angular/core';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html'
})
export class ResultItemComponent {

  @Input() game : Game | undefined;

}
