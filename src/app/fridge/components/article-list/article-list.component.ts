import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article.model';

import { LoadArticles } from '../../actions/list-articles-api.actions';
import { ArticlesState } from '../../reducers/articles.reducer';
import { getArticles } from '../../selectors/articles.selector';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {

  articles$: Observable<Article[]> = this.store.pipe(select(getArticles));

  constructor(
    private store: Store<ArticlesState>,
  ) { }

   // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getArticles();
  }

  // tslint:disable-next-line:typedef
  private getArticles() {
    this.store.dispatch(new LoadArticles());
  }

}
