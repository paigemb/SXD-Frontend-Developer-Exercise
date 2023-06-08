import { UserData } from "@/machines/UserData.types";

export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

const userEmpty: UserData = {
  firstName: 'John',
  lastName: 'Doe',
  age: '55',
  street: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    password: ''
};



const userComplete: UserData = {
  firstName: 'John',
  lastName: 'Doe',
  age: '55',
  street: '18th Dev Street',
  city: 'South Dev City',
  state: 'missouir',
  zip: '7777',
  email: 'paige@gmail.com',
  password: 'asdfasdf'
};

export const getUser = async (prevUser?: UserData) => {
  console.log('Pending...');

  const scenario = getRandomNumber(1, 3);

  await new Promise(res => setTimeout(res, 1000));

  if (prevUser) {
    return prevUser;
  } else {
    switch (scenario) {
      case 1:
        return userEmpty;
      case 2:
        return userComplete;
      default:
        return userEmpty;
    }
  }
};

export const updateUser = async (updated: UserData) => {
  console.log('Updating...');

  await new Promise(res => setTimeout(res, 1000));

  return updated;
};