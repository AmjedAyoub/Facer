import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Post } from '../_models/post.model';
import { UserService } from './user.service';
import { async } from 'rxjs/internal/scheduler/async';
import { createTokenForExternalReference } from '@angular/compiler/src/identifiers';

const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; }>();

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

   getPosts() {
    this.http
      .get<{ message: string; posts: any; }>(
        BACKEND_URL
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
                  return{
                    title: post.title,
                    content: post.content,
                    id: post._id,
                    imagePath: post.imagePath,
                    creator: post.creator
                    // creatorName
                  };
                }
            )
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = (transformedPostData).posts;
        this.postsUpdated.next({
          posts: [...this.posts]
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  addPost(title: string, content: string, image?: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    if (image !== null){
      postData.append('image', image, title);
    }
    return this.http
      .post<{ message: string; post: Post }>(
        BACKEND_URL,
        postData
      )
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        title,
        content,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put(BACKEND_URL + id, postData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }
}
