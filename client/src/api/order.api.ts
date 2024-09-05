import axios from 'axios';
import { domain } from '../Config';
import { SignInData, User , SignUpData } from "../interface/user.interface";

export const addOrder = async (data: SignInData) => {
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
