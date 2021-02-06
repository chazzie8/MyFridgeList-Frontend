import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { GoToSelectedFridge } from 'src/app/core/router/actions/navigation.actions';
import { BaseAppState } from 'src/app/core/router/reducers/custom-router-serializer.reducer';
import { FridgeDashboardItem } from 'src/app/shared/models/fridge-dashboard-item.model';
import { Fridge } from 'src/app/shared/models/fridge.model';

import { getFridgeDashboardItemsByFridgeId } from '../../selectors/dashboard.selector';
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

  dashboardItems$: Observable<FridgeDashboardItem[]> = this.fridgeId$.pipe(
    filter((fridgeId: string) => fridgeId !== ''),
    take(1),
    switchMap((fridgeId: string) => {
      return this.store.pipe(select(getFridgeDashboardItemsByFridgeId, fridgeId));
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
    this.dashboardItems$.pipe(
      filter(
        (items: FridgeDashboardItem[]) => Boolean(items) && items.length > 0
      ),
      take(1),
      tap(
        (items: FridgeDashboardItem[]) => {
          const goodItems = items.filter((item: FridgeDashboardItem) => item.expirystatus === 'good');
          const almostExpiredItems = items.filter((item: FridgeDashboardItem) => item.expirystatus === 'almostExpired');
          const expiredItems = items.filter((item: FridgeDashboardItem) => item.expirystatus === 'expired');

          let goodItemsAmount = 0;
          let almostExpiredItemsAmount = 0;
          let expiredItemsAmount = 0;

          if (goodItems.length > 0) {
            goodItemsAmount = goodItems.map((item: FridgeDashboardItem) => item.amount).reduce((a, b) => a + b);
          }

          if (almostExpiredItems.length > 0) {
            almostExpiredItemsAmount = almostExpiredItems.map((item: FridgeDashboardItem) => item.amount).reduce((a, b) => a + b);
          }

          if (expiredItems.length > 0) {
            expiredItemsAmount = expiredItems.map((item: FridgeDashboardItem) => item.amount).reduce((a, b) => a + b);
          }

          this.doughnutChartData = [
            [
              goodItemsAmount,
              almostExpiredItemsAmount,
              expiredItemsAmount
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
