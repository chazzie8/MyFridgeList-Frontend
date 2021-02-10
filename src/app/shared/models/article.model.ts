export interface Article {
  id: string;
  label: string;
  amount: number;
  expirydate: Date;
  timestamp: Date;
  expirystatus: string;
}

export interface StoreArticle extends Article {
  daysLeft: number;
}
