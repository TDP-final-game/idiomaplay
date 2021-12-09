import axios from 'axios';

const apiUrl = window.__RUNTIME_CONFIG__?.REACT_APP_BACK_URL;

const getDefaultStartDate = () => {
    const startDate = new Date();
	startDate.setDate(startDate.getDate() - 7);
    return startDate
};
// TODO: No sabía cómo hacerlo sin axios
export const getDailyAccessData = async (startDate, endDate) => {
    startDate = startDate || getDefaultStartDate();
    endDate = endDate || new Date();
    const response = await axios.get(`${apiUrl}/adminUsers/data/dailyAccess?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
};

export const getUserAccessData = async () => {
    const response = await axios.get(`${apiUrl}/adminUsers/data/usersAccess`);
    return response.data;
};