import { TransformedUser, User } from "../models/userModel";

export const transformUser = (users: User[]): TransformedUser => {
  const groupByData = users.reduce<Record<string, any>>((acc, user) => {
    const { company, gender, age, hair, firstName, lastName, address } = user;
    const { department } = company; 
    if (!acc[department]) {
      acc[department] = {
        male: 0,
        female: 0,
        hair: {} as Record<string, number>,
        addressUser: {} as Record<string, string>,
        ages: [] as number[], 
      };
    }
    const deptData = acc[department];
    deptData[gender]++;
    deptData.hair[hair.color] = (deptData.hair[hair.color] || 0) + 1;
    deptData.addressUser[`${firstName}${lastName}`] = address.postalCode;
    deptData.ages.push(age);
    return acc;
  }, {});

  const transformedData = Object.entries(groupByData).reduce<TransformedUser>((acc, [department, data]) => {
    const { ages } = data;
    const ageRange = `${Math.min(...ages)}-${Math.max(...ages)}`;
    acc[department] = {
      ...data,
      ageRange,
      ages: undefined
    };
    return acc;
  }, {});

  return transformedData;
};
