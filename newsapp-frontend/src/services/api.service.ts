import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getNews(q: string, page: number = 1) {
    return this.http.get('http://localhost:8080/news?q='+q+'&page='+page);
  }

}
