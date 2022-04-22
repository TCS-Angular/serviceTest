import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './models/post.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public ROOT_URL = 'https://jsonplaceholder.typicode.com'

  constructor(private http: HttpClient) { }

  getPostData() {
    return this.http.get<Post[]>(`${this.ROOT_URL}/posts`)
  }
}
