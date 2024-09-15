import axios from 'axios';

export const getBusinessDetaild = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/business`);
        return response.data[0];
    } catch (error) {
        console.error('error in api request of businessDetails', error);
        throw error;
    }
}
