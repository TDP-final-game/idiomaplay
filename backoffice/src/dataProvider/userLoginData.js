import axios from 'axios';

const apiUrl = window.__RUNTIME_CONFIG__?.REACT_APP_BACK_URL;

// TODO: No sabía cómo hacerlo sin axios
export const getDailyAccessData = async (startDate, endDate) => {
    return axios.get(`${apiUrl}/data/dailyAccess?startDate=${startDate}&endDate=${endDate}`);
};

export const getUserAccessData = async () => {
    return axios.get(`${apiUrl}/data/usersAccess`)
};