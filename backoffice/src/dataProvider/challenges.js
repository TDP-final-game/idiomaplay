import { apiUrl, headers, httpClient } from './utils';

import { mapUnit } from './units';

export const mapChallenge = challenge => ({
	...challenge,
	units: challenge.units.map(unit => mapUnit(`challenges-${challenge.id}`, unit))
})

const challenges = {
	getList: async (resource, params) => {
		const url = `${apiUrl}/${resource}`;
		const challenges = await httpClient(url, {headers}).then(({json}) => ({
			data: json.map(mapChallenge),
			total: json.length,
		}));

		console.log('challenges', challenges);

		return challenges
	},

	getOne: async (resource, params) => {
		const url = `${apiUrl}/${resource}/${params.id}`;

		const challenge = await httpClient(url).then(({json}) => ({
			data: mapChallenge(json),
		}))

		console.log('challenge', challenge);
		return challenge
	},
};

const dataProvider = {
	resources: ["challenges"],
	dataProvider: challenges
};

export default dataProvider;
