import { DashboardArticle } from 'src/app/shared/models/dashboard-article.model';

export enum DashboardArticlesApiActionTypes {

  LoadFridgeDashboardArticles = '[Dashboard] Load Fridge Dashboard Articles',
  LoadFridgeDashboardArticlesSuccess = '[Dashboard] Load Fridge Dashboard Articles Success',
}

export class LoadFridgeDashboardArticles {
  readonly type = DashboardArticlesApiActionTypes.LoadFridgeDashboardArticles;
}

export class LoadFridgeDashboardArticlesSuccess {
  readonly type = DashboardArticlesApiActionTypes.LoadFridgeDashboardArticlesSuccess;

  constructor(public dashboardArticles: DashboardArticle[]) {}
}

export type DashboardArticlesApiActions =
  | LoadFridgeDashboardArticles
  | LoadFridgeDashboardArticlesSuccess
;
