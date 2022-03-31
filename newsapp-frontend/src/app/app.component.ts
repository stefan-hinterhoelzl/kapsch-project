import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'newsapp-frontend';
  text?: string;

  constructor(private api: ApiService) {
    this.api.getNews().subscribe((message) => {
      this.text = (message as any).message;
    })
  }
}
