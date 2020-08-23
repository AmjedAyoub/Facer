import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

import { User } from '../_models/user.model';

@Injectable()
export class FacersListResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 5;

  constructor(private userService: UserService, private alertify: AlertifyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUserUpdateListener().pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data!');
        this.router.navigate(['']);
        return of(null);
      })
    );
  }
}
