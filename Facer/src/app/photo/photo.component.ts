import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PhotoService } from '../_services/photo.service';
import { PostsService } from '../_services/post.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

import { Photo } from '../_models/photo.model';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, OnDestroy {
  photos: any[] = [];
  private photosSub: Subscription;
  user: any;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;

  constructor(
    public postsService: PostsService,
    private authService: AuthService,
    private userService: UserService,
    private photoService: PhotoService) { }

  ngOnInit() {
    this.isLoading = true;
    this.photoService.getphotos();
    this.userId = this.authService.getUserId();
    this.photosSub = this.photoService
      .getPhotoUpdateListener()
      .subscribe((photoData: { photos: Photo[] }) => {
        this.isLoading = false;
        this.photos = photoData.photos;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });

  }

  setMainPhoto(photo: any){

  }

  deletePhoto(id: string){

  }

  ngOnDestroy() {
    this.photosSub.unsubscribe();
    // this.authStatusSub.unsubscribe();
  }

}
