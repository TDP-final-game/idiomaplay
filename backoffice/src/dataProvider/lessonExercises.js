import { apiUrl, httpClient } from './utils';

export const mapExercise = (lessonId, exerciseId, exercise) => ({
	...exercise,
	id: `${lessonId}-exercises-${exerciseId}`,
	orderNumber: parseInt(exerciseId, 10) + 1
})

const lessonExercises = {
	getOne: async (resource, params) => {
		const id = params.id.replace(/-/g, '/');
		const lessonId = params.id.split('-').slice(0, 6).join('-');
		const exerciseId = params.id.split('-').slice(-1);
		const exercise = await httpClient(`${apiUrl}/${id}`).then(({json}) => ({
			data: mapExercise(lessonId, exerciseId, json),
		}))
		console.log('exercise', exercise);
		return exercise
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

	create: async (resource, params) => {
		const resourceUrl = `/challenges/${params.data.challengeId}/units/${params.data.unitOrderNumber}/lessons/${params.data.lessonOrderNumber}/exercises`;


		params.data.options.forEach((option) => option['correct'] = option.correct ?? false)


		console.log(params.data);
		const response = await httpClient(
			`${apiUrl}${resourceUrl}`, {
			method: 'POST',
			body: JSON.stringify(params.data),
		})

		return { data: { ...params.data, id: response.json._id} };	
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
	resources: ["lessonExercises"],
	dataProvider: lessonExercises
};

export default dataProvider;
