import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user.model';
import { UserService } from '../_services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-facers',
  templateUrl: './facers.component.html',
  styleUrls: ['./facers.component.css']
})
export class FacersComponent implements OnInit {

  private postsSub: Subscription;
  private authStatusSub: Subscription;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers();
    this.postsSub = this.userService
      .getUserUpdateListener()
      .subscribe((userData: { users: User[] }) => {
        this.users = userData.users.reverse();
        console.log('users before  ' + this.users);
      });

  }

}
