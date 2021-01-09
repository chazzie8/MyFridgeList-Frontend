import { Params, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateSerializer } from '@ngrx/router-store';


export interface BaseAppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  firstUrlSegment: string | null;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    let firstUrlSegment = null;
    if (
      route.firstChild &&
      route.firstChild.url &&
      route.firstChild.url.length > 0
    ) {
      firstUrlSegment = route.firstChild.url[0].path;
    }

    let params = {};

    while (route.firstChild) {
      params = { ...params, ...route.params };
      route = route.firstChild;
    }
    params = { ...params, ...route.params };

    const {
      url,
      root: { queryParams },
    } = routerState;

    let storeReadyUrl = url;
    if (url.indexOf('?') > -1) {
      storeReadyUrl = url.substring(0, url.indexOf('?'));
    }

    return { url: storeReadyUrl, params, queryParams, firstUrlSegment };
  }
}
