import axios from "axios";
import { User } from "../models/userModel";

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get("https://dummyjson.com/users");
  return data.users;
};