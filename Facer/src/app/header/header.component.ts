import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user: any;

  constructor(private authService: AuthService, private alertify: AlertifyService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.getAuthStatusListener().subscribe(
      (res) => {
          this.isLoggedIn = res;
          if (this.isLoggedIn){
            const id = localStorage.getItem('userId');
            this.userService.getUser(id);
            this.userService.getAuthUser().subscribe(
              response => {
                this.user = response;
              }
            );
          }
      }
    );
  }

  logOut(){
    this.alertify.confirm('Are you sure you want to logout?', () => {
      this.authService.logout();
    });
  }

}
