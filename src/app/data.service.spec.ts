import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { Post } from './models/post.model';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing'

describe('DataService', () => {
  let service: DataService;
  let httpMock : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be able to get data from the api via get', () => {
    const dummyPosts: Post[] = [
      {
        userId: 1,
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      },
    ];

    service.getPostData().subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });
    const request = httpMock.expectOne( `${service.ROOT_URL}/posts`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts)
  });
  // afterEach(() => {
  //   httpMock.verify();
  // })
});
