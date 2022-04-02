import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/article';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss']
})
export class ResultViewComponent implements OnInit {

  amountOfResults: number = -1
  amountOfPages: number = -1
  results: Article[] = [];


  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    let q = this.route.snapshot.paramMap.get("q");

    if (q != undefined) {
      this.api.getNews(q).subscribe((data: any) => {
        console.log(data);
        this.amountOfResults = data[0].totalResults;
        this.amountOfPages = Math.ceil(this.amountOfResults/20);
        this.results = data[0].articles;
      })
    }
  }

  newSearch(): void {
    this.router.navigate(["search"])
  }

}
