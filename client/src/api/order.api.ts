import axios from 'axios';
import { OrderPackage } from "../interface/order.interface";

export const addOrderPackage = async (order: OrderPackage) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.post(`http://localhost:3000/OrderPackage`, order, {
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

export const getOrderPackage = async() => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/OrderPackage`, {
            headers: {
                'Content-Type': 'application/json',
                "token": token
            }
        });        
        return response;
    } catch (error) {
        console.error('error in api request of users', error);
        throw error;
    }
}
