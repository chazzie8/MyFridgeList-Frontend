import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Article } from 'src/app/shared/models/article.model';

import { PurgeFridgeItems } from '../../actions/fridge.actions';
import { LoadArticles } from '../../actions/list-articles-api.actions';
import { LoadFridges } from '../../actions/list-fridges-api.actions';
import { ArticlesState } from '../../reducers/articles.reducer';
import { getArticles } from '../../selectors/articles.selector';
import { getSelectedFridgeId } from '../../selectors/fridges.selector';
import { DialogArticleComponent } from '../dialog-article/dialog-article.component';
import { getAlmostExpiredArticles, getExpiredArticles, getShowGoodArticles } from './../../selectors/articles.selector';

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

  public ngOnInit(): void {
    this.store.dispatch(new LoadFridges());
    this.getArticles();
  }

  public ngOnDestroy(): void {
    this.store.dispatch(new PurgeFridgeItems());
  }

  public getArticles(): void {
    this.fridgeId$.pipe(
      take(1),
    ).subscribe((fridgeId): void => {
      this.store.dispatch(new LoadArticles(fridgeId));
    });
  }

  public handleOpenDialogClick(): void {
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

  public handleShowExpired(): void {
    this.articles$ = this.store.pipe(select(getExpiredArticles));
  }

  public handleShowAlmostExpired(): void {
    this.articles$ = this.store.pipe(select(getAlmostExpiredArticles));
  }

  public handleShowGoodArticles(): void {
    this.articles$ = this.store.pipe(select(getShowGoodArticles));
  }

  public handleShowAll(): void {
    this.articles$ = this.store.pipe(select(getArticles));
  }
}
