import axios from 'axios';
import { OrderPackage } from "../interface/order.interface";

export const addOrderPackage = async (order: OrderPackage) => {
    try {
        const response = await axios.post(`http://localhost:3000/OrderPackage`, order, {
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

export const getAllPotograpyName = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/PhotographyPackage`)
        return response.data;
    } catch (error) {
        console.error('error in api request of users', error);
        throw error;
    }
}
