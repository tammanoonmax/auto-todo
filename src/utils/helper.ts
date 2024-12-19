import { Item } from "../components/AutoTodo/types";

export const filterOutItem = (list: Item[], item: Item): Item[] =>
  list.filter((i) => i !== item);

export const addToList = (list: Item[], item: Item): Item[] => [...list, item];
