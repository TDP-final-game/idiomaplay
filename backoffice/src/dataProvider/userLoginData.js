import axios from 'axios';

const apiUrl = window.__RUNTIME_CONFIG__?.REACT_APP_BACK_URL;

export const getDailyAccessData = async startDate => {
    const response = await axios.get(`${apiUrl}/adminUsers/data/dailyAccess?startDate=${startDate.toISOString()}`);
    return response.data;
};

export const getUserAccessData = async startDate => {
    const response = await axios.get(`${apiUrl}/adminUsers/data/usersAccess?startDate=${startDate.toISOString()}`);
    return response.data;
};

export const getDailyUnitsFinishedData = async startDate => {
    const response = await axios.get(`${apiUrl}/adminUsers/data/dailyUnitsFinished?startDate=${startDate.toISOString()}`);
    return response.data;
};

export const getUnitAverageResolutionTime = async startDate => {
    const response = await axios.get(`${apiUrl}/adminUsers/data/unitAverageResolutionTime?startDate=${startDate.toISOString()}`);
    return response.data;
};


