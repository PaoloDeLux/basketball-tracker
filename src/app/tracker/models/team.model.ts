import { Game } from "./game.model";

export class Team {

  public games: Array<Game>;

  constructor(
    public id: number,
    public abbreviation: string,
    public conference: string,
    public division: string,
    public fullname: string,
    public name: string,
    public city: string
    )
    {
      this.games = new Array<Game>();
    }
}
