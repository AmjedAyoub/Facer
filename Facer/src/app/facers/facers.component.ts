import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user.model';
import { UserService } from '../_services/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-facers',
  templateUrl: './facers.component.html',
  styleUrls: ['./facers.component.css']
})
export class FacersComponent implements OnInit {

  isAuth = false;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  users: User[];

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getUsers();
    this.postsSub = this.userService
      .getUserUpdateListener()
      .subscribe((userData: { users: User[] }) => {
        this.users = userData.users.reverse();
        console.log('users before  ' + this.users);
      });
    this.isAuth = this.authService.getIsAuth();
  }


  loadUsers() {
    // tslint:disable-next-line: max-line-length
    this.userService.getUserUpdateListener().subscribe(
      (res) => {
      this.users = res.users;
    },
    (err) => {
      // this.alerttify.error(err);
      console.log(err);
    });
  }

}
