import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Article, StoreArticle } from 'src/app/shared/models/article.model';

import { DeleteArticle } from '../../actions/articles-api.actions';
import { ArticlesState } from '../../reducers/articles.reducer';
import { DialogArticleComponent } from '../dialog-article/dialog-article.component';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss']
})
export class ArticleListItemComponent {

  @Input() articles: StoreArticle[];
  @Input() fridgeId: string;

  constructor(
    public dialog: MatDialog,
    private store: Store<ArticlesState>,
  ) { }

  public handleDeleteArticleClick(fridgeId: string, articleId: string): void {
    this.store.dispatch(new DeleteArticle(fridgeId, articleId));
  }

  public openDialogClick(fridgeId: string, article: Article): void {
    this.dialog.open(DialogArticleComponent, {
      data: {
        fridgeId,
        article,
      },
      disableClose: true,
    });
  }
}
