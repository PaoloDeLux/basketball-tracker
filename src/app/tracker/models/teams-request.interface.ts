export interface TeamsRequest {
  data: [{
    id: number;
    abbreviation: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
    city: string;
  }],
  meta : {
    total_pages: number,
    current_page: number,
    next_page: number,
    per_page: number,
    total_count: number
  }
}
