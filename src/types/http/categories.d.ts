declare interface IGetCategoriesData {
  _id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
}

declare interface IGetCategories {
  message: string;
  data: IGetCategoriesData[];
}
