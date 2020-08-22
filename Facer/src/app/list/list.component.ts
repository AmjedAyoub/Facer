import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../_models/post.model';
import { PostsService } from '../_services/post.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  posts: any[] = [];
  user: any;
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public postsService: PostsService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[] }) => {
        this.isLoading = false;
        this.posts = postData.posts.reverse();
        console.log('Posts before  ' + this.posts);
      });

    // for (let post of this.posts) {
    //   const creatorName = this.getUserName(post.creator);
    //   console.log(creatorName);
    //   post = {
    //     post,
    //     creatorName,
    //   };
    // }
    // console.log('Posts after  ' + this.posts);
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  getUserName(id: string) {
    this.userService.getUserName(id).subscribe((res) => {
      console.log(res);
      return res.Name;
    });
  }

  ngOnDestroy() {
    // this.postsSub.unsubscribe();
    // this.authStatusSub.unsubscribe();
  }
}
