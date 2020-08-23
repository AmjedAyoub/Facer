import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Photo } from '../_models/photo.model';
import { UserService } from './user.service';

const BACKEND_URL = environment.apiUrl + '/photo/';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private photos: Photo[] = [];
  private photosUpdated = new Subject<{ photos: Photo[]; }>();

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

   getphotos() {
    this.http
      .get<{ message: string; photos: any; }>(
        BACKEND_URL
      )
      .pipe(
        map(postData => {
          return {
            photos: postData.photos.map(photo => {
                  return{
                    url: photo.url,
                    dateAdded: photo.dateAdded,
                    isMain: photo.isMain,
                    userId: photo.userId
                  };
                }
            )
          };
        })
      )
      .subscribe(transformedPostData => {
        this.photos = (transformedPostData).photos;
        this.photosUpdated.next({
          photos: [...this.photos]
        });
      });
  }

  getPhotoUpdateListener() {
    return this.photosUpdated.asObservable();
  }

  getPhotot(id: string) {
    return this.http.get<{
      _id: string;
      url: string;
      dateAdded: Date;
      isMain: boolean;
      userId: string;
    }>(BACKEND_URL + id);
  }

  addPhoto(image?: File) {
    const postData = new FormData();
    if (image !== null){
      postData.append('image', image);
      postData.append('userId', localStorage.getItem('userId'));
    }
    return this.http
      .post<{ message: string; photo: Photo }>(
        BACKEND_URL,
        postData
      );
  }


  deletePhoto(photoId: string) {
    return this.http.delete(BACKEND_URL + photoId);
  }
}
