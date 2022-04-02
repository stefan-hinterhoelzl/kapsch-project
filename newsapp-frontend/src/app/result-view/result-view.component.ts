import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, mergeMap, Observable, startWith, Subscription, take } from 'rxjs';
import { Article } from 'src/models/article';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss']
})
export class ResultViewComponent implements OnInit, OnDestroy {

  amountOfResults: number = -1
  amountOfPages: number = -1
  currentPage = 1;
  results: Article[] = [];
  latestArticle?: Article;
  detailArticle?: Article
  lastupdated?: number

  UpdateObservable?: Subscription


  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }


  ngOnDestroy(): void {
    if (this.UpdateObservable != undefined) {
      this.UpdateObservable.unsubscribe();
    }
  }

  ngOnInit(): void {

    let q = this.route.snapshot.paramMap.get("q") || " ";

    this.loadArticles(q, 1);

    if (q != " ") {
      this.UpdateObservable = interval(600000) //600000ms = 600s = 5 min
      .pipe(
        mergeMap(() => this.api.checkForNewArticles(q))
      ).subscribe((data: any) => {
        this.lastupdated = Date.now();
        let article: Article = data[0].articles[0];
        if (article.title != this.latestArticle?.title) {
          //New articles discovered
          if (this.currentPage == 1) {
            //TO DO Load the new page 1 again
          } else {
            //TO DO show notification to go back to page 1
          }
        }
      })
    }
  }

  loadArticles(q: string, page: number) {

    if (q != " ") {
      this.api.getNews(q).pipe(
        take(1))
        .subscribe((data: any) => {
        console.log(data);
        this.amountOfResults = data[0].totalResults;
        this.amountOfPages = Math.ceil(this.amountOfResults/20);
        this.results = data[0].articles;
        this.latestArticle = this.results[0]
        this.lastupdated = Date.now();
      })
    }

  }

  newSearch(): void {
    this.router.navigate(["search"])
  }

}
