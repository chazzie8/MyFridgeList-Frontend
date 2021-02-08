import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { GoToSelectedFridge } from 'src/app/core/router/actions/navigation.actions';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';
import { DashboardArticle } from 'src/app/shared/models/dashboard-article.model';
import { Fridge } from 'src/app/shared/models/fridge.model';

import { getFridgeDashboardArticleByFridgeId } from '../../selectors/dashboard.selector';
import { getFridgeByFridgeId } from '../../selectors/fridges.selector';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss']
})
export class DashboardChartComponent implements OnInit {

  private fridgeId$ = new BehaviorSubject<string | undefined>(undefined);

  @Input()
  set fridgeId(fridgeId: string) {
    this.fridgeId$.next(fridgeId);
  }
  get fridgeId(): string {
    return this.fridgeId$.value;
  }

  fridge$: Observable<Fridge> = this.fridgeId$.pipe(
    filter((fridgeId: string) => fridgeId !== ''),
    take(1),
    switchMap((fridgeId: string) => {
      return this.store.pipe(select(getFridgeByFridgeId, fridgeId));
    })
  );

  dashboardArticles$: Observable<DashboardArticle[]> = this.fridgeId$.pipe(
    filter((fridgeId: string) => fridgeId !== ''),
    take(1),
    switchMap((fridgeId: string) => {
      return this.store.pipe(select(getFridgeDashboardArticleByFridgeId, fridgeId));
    })
  );

  public doughnutChartLabels: Label[] = [
    'Noch gut',
    'Fast Abgelaufen',
    'Abgelaufen'
  ];
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutColors = [{
    backgroundColor: [
      '#00aa00',
      '#E0A800',
      '#f44336',
    ]
  }];
  public doughnutOptions = {
    legend: {
      position: 'bottom',
    }
  };

  constructor(
    private store: Store<BaseAppState>,
  ) { }

  public ngOnInit(): void {
    this.initializeChartData();
  }

  public initializeChartData(): void {
    this.dashboardArticles$.pipe(
      filter(
        (articles: DashboardArticle[]) => Boolean(articles) && articles.length > 0
      ),
      take(1),
      tap(
        (articles: DashboardArticle[]) => {
          const goodArticles = articles.filter((article: DashboardArticle) => article.expirystatus === 'good');
          const almostExpiredArticles = articles.filter((article: DashboardArticle) => article.expirystatus === 'almostExpired');
          const expiredArticles = articles.filter((article: DashboardArticle) => article.expirystatus === 'expired');

          let goodArticlesAmount = 0;
          let almostExpiredArticlesAmount = 0;
          let expiredArticlesAmount = 0;

          if (goodArticles.length > 0) {
            goodArticlesAmount = goodArticles.map((article: DashboardArticle) => article.amount).reduce((a, b) => a + b);
          }

          if (almostExpiredArticles.length > 0) {
            // tslint:disable-next-line:max-line-length
            almostExpiredArticlesAmount = almostExpiredArticles.map((article: DashboardArticle) => article.amount).reduce((a, b) => a + b);
          }

          if (expiredArticles.length > 0) {
            expiredArticlesAmount = expiredArticles.map((article: DashboardArticle) => article.amount).reduce((a, b) => a + b);
          }

          this.doughnutChartData = [
            [
              goodArticlesAmount,
              almostExpiredArticlesAmount,
              expiredArticlesAmount
            ],
          ];
        }
      ),
    ).subscribe();
  }

  public handleGoToSelectedFridge(fridgeId: string): void {
    this.store.dispatch(new GoToSelectedFridge(fridgeId));
  }

}
