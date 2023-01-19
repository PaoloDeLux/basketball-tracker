import { Component, Input } from '@angular/core';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-games-strip',
  templateUrl: './games-strip.component.html'
})
export class GamesStripComponent {

  @Input() games: Game[] | undefined;
  @Input() teamId: number | undefined;

}
