import axios from 'axios';
import { OrderPackage } from "../interface/order.interface";
import { domain } from '../Config';
import isTokenValid from '../utils/checkToken';

export const addOrderPackage = async (order: OrderPackage) => {
    try {
        const token = isTokenValid();
        if (!token) { return; }
        const response = await axios.post(`${domain}/OrderPackage`, order, {
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

export const getOrderPackage = async () => {
    try {
        const token = isTokenValid();
        if (!token) { return ; }
        const response = await axios.get(`${domain}/OrderPackage`, {
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

export const deleteOrderPackage = async (id: Number) => {
    try {
        const token = isTokenValid();
        if (!token) { return; }
        const response = await axios.delete(`${domain}/OrderPackage/${id}`, {
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

export const editOrderPackage = async (order: OrderPackage) => {
    try {
        const token = isTokenValid();
        if (!token) { return; }
        const response = await axios.put(`${domain}/OrderPackage/${order.id}`, order, {
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