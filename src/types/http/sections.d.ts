declare interface IGetSectionsData {
  _id: string;
  title: string;
  order: number;
  type: "normal" | "slider" | "continue_watching";
  content: IContentData[];
  category: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

declare interface IGetSections {
  message: string;
  data: IGetSectionsData[];
}
