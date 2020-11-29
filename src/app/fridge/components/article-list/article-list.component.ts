import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  constructor(
    private store: Store<ArticlesState>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }

  private getArticles(): void {
    this.store.dispatch(new LoadArticles());
  }

  handleAddClick(): void {
    this.dialog.open(DialogArticleComponent);
  }

}
