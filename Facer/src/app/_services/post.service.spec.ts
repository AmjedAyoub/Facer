/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostsService } from './post.service';

describe('Service: Post', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsService]
    });
  });

  it('should ...', inject([PostsService], (service: PostsService) => {
    expect(service).toBeTruthy();
  }));
});
