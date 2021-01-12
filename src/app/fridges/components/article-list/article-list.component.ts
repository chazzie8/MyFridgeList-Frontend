import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Article } from 'src/app/shared/models/article.model';

import { PurgeFridgeItems } from '../../actions/fridge.actions';
import { LoadArticles } from '../../actions/list-articles-api.actions';
import { ArticlesState } from '../../reducers/articles.reducer';
import { getArticles } from '../../selectors/articles.selector';
import { getSelectedFridgeId } from '../../selectors/fridges.selector';
import { DialogArticleComponent } from '../dialog-article/dialog-article.component';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit, OnDestroy {

  articles$: Observable<Article[]> = this.store.pipe(select(getArticles));
  fridgeId$: Observable<string> = this.store.pipe(select(getSelectedFridgeId));

  currentDate: Date = new Date();

  constructor(
    private store: Store<ArticlesState>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new PurgeFridgeItems());
  }

  private getArticles(): void {
    this.fridgeId$.pipe(
      take(1),
    ).subscribe((fridgeId): void => {
      this.store.dispatch(new LoadArticles(fridgeId));
    });
  }

  handleOpenDialogClick(): void {
    this.fridgeId$.pipe(
      take(1),
    ).subscribe((fridgeId): void => {
      this.dialog.open(DialogArticleComponent, {
        data: {
          fridgeId,
          article: null
        },
        disableClose: true
      });
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
