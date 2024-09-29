import axios from 'axios';
// import { domain } from '../Config';
import { SignInData, User } from "../interface/user.interface";
const token = sessionStorage.getItem("token");

export const SignIn = async (data: SignInData) => {
  try {
    const response = await axios.post(`http://localhost:3000/signin`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('error in api request of users', error);
    throw error;
  }
}

export const SignUp = async (data: User) => {
  console.log(data);
  try {
    const response = await axios.post(`http://localhost:3000/signup`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('error in api request of users', error);
    throw error;
  }
}

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/User`, {
      headers: {
        'Content-Type': 'application/json',
        "token": token
      }
    });
    return response.data;
  } catch (error) {
    console.error('error in api request of users', error);
    throw error;
  }
}

export const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:3000/User/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        "token": token
      }
    });
    return response.data;
  } catch (error) {
    console.error('error in api request of users', error);
    throw error;
  }
}

export const editUser = async (user: any) => {
  try {
    console.log(user);
    const response = await axios.put(`http://localhost:3000/User/${user.id}`, user, {
      headers: {
        'Content-Type': 'application/json',
        "token": token
      }
    });
    return response.data;
  } catch (error) {
    console.error('error in api request of users', error);
    throw error;
  }
}
