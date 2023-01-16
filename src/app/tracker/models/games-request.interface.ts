import { Team } from "./team.model"

export interface GamesRequest {
  data: [{
    id: number,
    date: Date,
    home_team_score:number,
    visitor_team_score:number,
    season:number,
    home_team : Team,
    visitor_team: Team
  }],
  meta : {
    total_pages: number,
    current_page: number,
    next_page: number,
    per_page: number,
    total_count: number
  }
}
