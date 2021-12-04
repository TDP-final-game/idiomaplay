import { fetchUtils } from 'react-admin';

const apiUrl = window.__RUNTIME_CONFIG__?.REACT_APP_BACK_URL;
const httpClient = fetchUtils.fetchJson;

const authProvider = {
	// authentication
	login: ({username, password}) => {
		const url = `${apiUrl}/adminUsers/session`;
		return httpClient(url, {
			method: "POST", body: JSON.stringify({
				user: username,
				password
			})
		}).then(auth => {
			localStorage.setItem('auth', JSON.stringify(auth.body));
		})
	},
	checkError: () => {
		return Promise.resolve()
	},
	checkAuth: () => {
		return localStorage.getItem('auth') ? Promise.resolve()
			: Promise.reject()
	},
	logout: () => {
		localStorage.removeItem('auth')
		return Promise.resolve()
	},
	getIdentity: () => {
		try {
			const { user } = JSON.parse(localStorage.getItem('auth'));
			return Promise.resolve({ fullName: user });
		} catch (error) {
			return Promise.reject(error);
		}
	},
	// authorization
	getPermissions: () => {
		return Promise.resolve()
	},
};

export default authProvider;
