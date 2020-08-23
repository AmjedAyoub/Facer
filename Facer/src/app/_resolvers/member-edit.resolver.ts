import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

import { User } from '../_models/user';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

  // tslint:disable-next-line: max-line-length
  constructor(private userService: UserService, private authService: AuthService, private alertify: AlertifyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving your data!');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
