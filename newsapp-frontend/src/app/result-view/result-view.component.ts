import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, mergeMap, Subscription, switchMap, take } from 'rxjs';
import { Article } from 'src/models/article';
import { ApiService } from 'src/services/api.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss']
})
export class ResultViewComponent implements OnInit, OnDestroy {

  q?: string;
  amountOfResults: number = -1
  amountOfPages: number = -1
  currentPage = 1;
  results: Article[] = [];
  latestArticle?: Article;
  detailArticle?: Article
  lastUpdated?: number

  UpdateObservable?: Subscription
  routeSubscription?: Subscription


  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router, private snackbar: SnackbarComponent) { }


  ngOnDestroy(): void {
    if (this.UpdateObservable != undefined) {
      this.UpdateObservable.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.routeSubscription = this.route.params.subscribe(params => {
      let q: string = params["q"]
      this.q = q;
      this.initialize(q);
    })
  }


  initialize(q: string) {

    this.loadArticles(q);

    if (q != " ") {
      this.UpdateObservable = interval(600000) //600000ms = 600s = 10 min
      .pipe(
        switchMap(() => this.api.checkForNewArticles(q))
      ).subscribe((data: any) => {
        console.log(Date.now())
        this.lastUpdated = Date.now();
        let article: Article = data[0].articles[0];
        if (article.title != this.latestArticle?.title) {
          //New articles discovered
          if (this.currentPage == 1) {
            this.loadArticles(q);
            this.snackbar.openSnackBar("Neue Artikel geladen.", "green-snackbar");
          } else {
            //TO DO show notification to go back to page 1
            let ref = this.snackbar.openSnackBar("Neue Artikel sind verfügbar. Zur Seite 1 zurückkehren?", undefined, "Ja");

            ref.onAction().subscribe(()=> {
              this.loadArticles(q);
            })
          }
        }
      });
    }
  }

  loadArticles(q: string, page: number = -1) {

    if (q != " ") {
      this.api.getNews(q, page).pipe(
        take(1))
        .subscribe((data: any) => {
        console.log(data);
        this.amountOfResults = data[0].totalResults;
        this.amountOfPages = Math.ceil(this.amountOfResults/20);
        this.results = data[0].articles;
        this.latestArticle = this.results[0]
        this.lastUpdated = Date.now();
      })
    }

  }

  newSearch(): void {
    this.router.navigate(["search"])
  }

  goToNextPage(): void {
    this.currentPage = this.currentPage+1;
    if (this.q != undefined && this.currentPage != undefined) this.loadArticles(this.q, this.currentPage);
  }


  goToPreviousPage(): void {
    this.currentPage = this.currentPage-1;
    if (this.q != undefined && this.currentPage != undefined) this.loadArticles(this.q, this.currentPage);
  }

}
