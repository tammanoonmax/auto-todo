export enum ItemType {
  Fruit = 'Fruit',
  Vegetable = 'Vegetable',
}
export interface Item {
  type: 'Fruit' | 'Vegetable';
  name: string;
}
