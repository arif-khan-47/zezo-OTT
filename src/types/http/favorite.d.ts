declare interface IAllFavoriteData {
  _id: number;
  user_id: string;
  content: IContent
}

declare interface IFavorite {
  message: string;
  data: [IAllSubscriptionData];
}
