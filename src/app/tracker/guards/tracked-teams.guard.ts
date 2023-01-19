import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { TeamsService } from 'src/app/tracker/services/teams.service';
import { Team } from 'src/app/tracker/models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TrackedTeamsGuard implements CanActivate  {
  constructor(private teamsService: TeamsService, private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      return this.teamsService.getTrackedTeams().pipe(
        take(1),
        map((tt : Team[])=>{
          if (!tt || tt.length===0 ){
            return  false;
          }
          return true;
        }),
        map(response => {
          if (!response) {
            this.teamsService.retrieveTrackedTeams().pipe(take(1)).subscribe((teams)=> {
              if (!teams || teams.length ===0) {
                alert('No tracked teams!');
                this.router.navigateByUrl('/');
                return false;
              }
              return true;
            })
          }
          return true;
        })
      );

  }
}
