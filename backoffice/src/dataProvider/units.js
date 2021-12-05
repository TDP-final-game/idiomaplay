import { apiUrl, getChallengeId, headers, httpClient } from './utils';

import { mapLesson } from './lessons';

const mapUnit = unit => ({
	...unit,
	lessons: unit.lessons.map(lesson => mapLesson(`units-${unit.orderNumber}`, lesson)),
	id: unit.orderNumber
})

const units = {
	getList: async (resource, params) => {
		const url = `${apiUrl}/challenges/${await getChallengeId()}/${resource}`;
		const units = await httpClient(url, {headers}).then(({json}) => ({
			data: json.map(mapUnit),
			total: json.length,
		}));

		console.log('units', units);

		return units
	},

	getOne: async (resource, params) => {
		const url = `${apiUrl}/challenges/${await getChallengeId()}/${resource}/${params.id}`;

		const unit = await httpClient(url).then(({json}) => ({
			data: mapUnit(json),
		}))

		console.log('unit', unit);
		return unit
	},

	getMany: (resource, params) => {
		// const query = {
		// 	filter: JSON.stringify({ id: params.ids }),
		// };
		// const url = `${apiUrl}/${resource}?${stringify(query)}`;
		// return httpClient(url).then(({ json }) => ({ data: json }));
	},

	getManyReference: (resource, params) => {
		// const { page, perPage } = params.pagination;
		// const { field, order } = params.sort;
		// const query = {
		// 	sort: JSON.stringify([field, order]),
		// 	range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
		// 	filter: JSON.stringify({
		// 		...params.filter,
		// 		[params.target]: params.id,
		// 	}),
		// };
		// const url = `${apiUrl}/${resource}?${stringify(query)}`;
		//
		// return httpClient(url).then(({ headers, json }) => ({
		// 	data: json,
		// 	total: parseInt(headers.get('content-range').split('/').pop(), 10),
		// }));
	},

	update: (resource, params) => {
		return httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({json}) => ({data: json}))
	},

	updateMany: (resource, params) => {
		// const query = {
		// 	filter: JSON.stringify({ id: params.ids}),
		// };
		// return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
		// 	method: 'PUT',
		// 	body: JSON.stringify(params.data),
		// }).then(({ json }) => ({ data: json }));
	},

	create: (resource, params) => {
		// httpClient(`${apiUrl}/${resource}`, {
		// 	method: 'POST',
		// 	body: JSON.stringify(params.data),
		// }).then(({json}) => ({
		// 	data: {...params.data, id: json.id},
		// }))
	},

	delete: (resource, params) => {
		// httpClient(`${apiUrl}/${resource}/${params.id}`, {
		// 	method: 'DELETE',
		// }).then(({json}) => ({data: json}))
	},

	deleteMany: (resource, params) => {
		// const query = {
		// 	filter: JSON.stringify({ id: params.ids}),
		// };
		// return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
		// 	method: 'DELETE',
		// }).then(({ json }) => ({ data: json }));
	}
};

const dataProvider = {
	resources: ["units"],
	dataProvider: units
};

export default dataProvider;
