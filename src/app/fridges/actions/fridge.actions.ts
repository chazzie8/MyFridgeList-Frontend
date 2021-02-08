export enum FridgeActionTypes {

  PurgeFridgeArticles = '[Fridge] Purge Fridge Articles',
}

export class PurgeFridgeArticles {
  readonly type = FridgeActionTypes.PurgeFridgeArticles;
}

export type FridgeActions =
  | PurgeFridgeArticles
;
