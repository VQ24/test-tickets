export interface CategoryListItem {
  _id: string;
  name: string;
  subCategory: CategoryListItem[];
}
