import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from 'src/app/shared/models/article.model';

import { LoadArticles } from '../../actions/list-articles-api.actions';
import { ArticlesState } from '../../reducers/articles.reducer';
import { getArticles } from '../../selectors/articles.selector';
import { DialogArticleComponent } from '../dialog-article/dialog-article.component';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {

  articles$: Observable<Article[]> = this.store.pipe(select(getArticles));
  currentDate: Date = new Date();

  constructor(
    private store: Store<ArticlesState>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }

  private getArticles(fridgeId: string): void {
    this.store.dispatch(new LoadArticles());
  }

  handleAddClick(): void {
    this.dialog.open(DialogArticleComponent, {
      disableClose: true
    });
  }

  handleShowExpired(): void {
    this.articles$ = this.store.pipe(select(getArticles)).pipe(
      map(articles => {
        return articles.filter(article => this.currentDate.getTime() >= new Date(article.expirydate).getTime());
    }));
  }

  handleShowAlmostExpired(): void {
    this.articles$ = this.store.pipe(select(getArticles)).pipe(
      map(articles => {
        return articles.filter(article => {
          // MHD - jetziges Datum = Tage übrig (kleiner als 3)
          const expiryDate = new Date(article.expirydate);
          const daysLeftMs = expiryDate.getTime() - this.currentDate.getTime();
          const days = daysLeftMs / 1000 / 60 / 60 / 24;
          return ((days < 4) && (daysLeftMs > 0));
        });
    }));
  }

  handleShowGoodArticles(): void {
    this.articles$ = this.store.pipe(select(getArticles)).pipe(
      map(articles => {
        return articles.filter(article => {
          // MHD - jetziges Datum = Tage übrig (kleiner als 3)
          const expiryDate = new Date(article.expirydate);
          const daysLeftMs = expiryDate.getTime() - this.currentDate.getTime();
          const days = daysLeftMs / 1000 / 60 / 60 / 24;
          return ((days > 4) && (daysLeftMs > 0));
        });
    }));
  }

  handleShowAll(): void {
    this.articles$ = this.store.pipe(select(getArticles));
  }

}
