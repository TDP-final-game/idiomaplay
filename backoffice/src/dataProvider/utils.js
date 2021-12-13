import { fetchUtils } from 'react-admin';

export const headers = new Headers({"authorization": "not-needed"});

export const httpClient = (url, options = {}) =>
	fetchUtils.fetchJson(url, {headers, ...options});

export const apiUrl = window.__RUNTIME_CONFIG__?.REACT_APP_BACK_URL;
