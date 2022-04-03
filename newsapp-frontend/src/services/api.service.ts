import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getNews(q: string, page: number = -1) {
    if (page != -1) return this.http.get('http://212.95.24.45:8080/news?q='+q+'&page='+page);
    else return this.http.get('http://212.95.24.45:8080/news?q='+q);
  }

  checkForNewArticles(q: string) {
    return this.http.get('http://212.95.24.45:8080/news?q='+q+'&pageSize=1');
  }

}
