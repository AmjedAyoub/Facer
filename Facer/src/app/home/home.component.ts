import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup
} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

import { UserService } from '../_services/user.service';
import { PostsService } from '../_services/post.service';
import { Subscription } from 'rxjs';
import { Post } from '../_models/post.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  addPostForm: FormGroup;
  imagePreview: string;
  uploader: FileUploader;
  posts: any[] = [];
  private postsSub: Subscription;

  constructor(
    private userService: UserService,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[] }) => {
        this.posts = postData.posts;
      });

    const id = localStorage.getItem('userId');
    this.userService.getUser(id);
    this.userService.getAuthUser().subscribe((res) => {
      this.user = res;
    });

    this.addPostForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null),
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addPostForm.patchValue({ image: file });
    this.addPostForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.addPostForm.invalid) {
      return;
    }
    // this.isLoading = true;
    this.postsService.addPost(
      this.addPostForm.value.title,
      this.addPostForm.value.content,
      this.addPostForm.value.image
    );
    this.addPostForm.reset();
    this.imagePreview = null;
  }
}
