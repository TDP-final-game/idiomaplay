import axios from 'axios';

const apiUrl = window.__RUNTIME_CONFIG__?.REACT_APP_BACK_URL;

// TODO: No sabía cómo hacerlo sin axios
export const getDailyAccessData = async (startDate, endDate) => {
   
    let response;

    if(!startDate || !endDate){
       response = await axios.get(`${apiUrl}/adminUsers/data/dailyAccess`);
    } else {
       response = await axios.get(`${apiUrl}/adminUsers/data/dailyAccess?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
    }

    return response.data;
};

export const getUserAccessData = async () => {
    const response = await axios.get(`${apiUrl}/adminUsers/data/usersAccess`);
    return response.data;
};