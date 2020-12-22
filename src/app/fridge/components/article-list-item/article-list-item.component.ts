import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article.model';

import { DeleteArticle } from '../../actions/articles-api.actions';
import { ArticlesState } from '../../reducers/articles.reducer';
import { getSelectedFridgeId } from '../../selectors/fridges.selector';
import { DialogArticleComponent } from '../dialog-article/dialog-article.component';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss']
})
export class ArticleListItemComponent {

  @Input() article: Article;
  @Input() fridgeId: string;

  panelOpenState = false;

  constructor(
    public dialog: MatDialog,
    private store: Store<ArticlesState>,
  ) { }

  handleDeleteArticleClick(fridgeId: string, articleId: string): void {
      this.store.dispatch(new DeleteArticle(fridgeId, articleId));
  }

  openDialogClick(fridgeId: string, article: Article): void {
      console.log(article);
      this.dialog.open(DialogArticleComponent, {
        data: {
          fridgeId,
          article,
        },
        disableClose: true,
      });
  }

}
