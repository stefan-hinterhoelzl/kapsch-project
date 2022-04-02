import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public q?: string;

  constructor(private router: Router) {}

  search() {
    if (this.q != undefined) {
        this.router.navigate(['results/'+this.q])
    }
  }




}
