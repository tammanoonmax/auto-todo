import { useState, useEffect } from 'react';
import { TransformedUser } from '../models/userModel';
import { fetchUsers } from '../services/userService';
import { transformUser } from '../utils/user';

export const useGetTransformUser = () => {
  const [data, setData] = useState<TransformedUser | null>(null);

  useEffect(() => {
    const fetchAndTransformUsers = async () => {
      try {
        const users = await fetchUsers();
        const TransformedUser = transformUser(users);
        setData(TransformedUser);
      } catch (error) {
        console.error('Failed to fetch or transform users:', error);
      }
    };

    fetchAndTransformUsers();
  }, []);

  return data;
};
