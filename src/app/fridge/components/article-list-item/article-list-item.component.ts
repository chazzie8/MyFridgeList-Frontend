import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/models/article.model';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss']
})
export class ArticleListItemComponent implements OnInit {

  @Input() article: Article;

  constructor() { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    console.log(this.article);
  }

}
