import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../_models/user.model';


const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new Subject<any>();
  private users: User[] = [];
  private userssUpdated = new Subject<{ users: User[]; }>();

constructor(private http: HttpClient) { }

getUsers(){
  this.http
    .get<{ message: string; users: any; }>(
      BACKEND_URL
    )
    .subscribe(transformedPostData => {
      this.users = (transformedPostData).users;
      this.userssUpdated.next({
        users: [...this.users]
      });
    });
}

getUserUpdateListener() {
  return this.userssUpdated.asObservable();
}

getUser(id: string){
  this.http.get<{
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    knownAs: string;
    dateOfBirth: Date;
    city: string;
    country: string;
  }>(BACKEND_URL + id).subscribe(
    (res) => {
      this.user.next(res);
    }
  );
}

getUserName(id: string){
  return this.http.get<{
    Name: string;
  }>(BACKEND_URL + '/name/' + id);
}


getAuthUser() {
  return this.user.asObservable();
}

}
