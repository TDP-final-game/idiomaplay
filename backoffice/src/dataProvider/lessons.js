import { apiUrl, getChallengeId, httpClient } from './utils';
import { mapExercise } from './lessonExercises';

export const mapLesson = (unitId, lesson) => {
	const lessonId = `${unitId}-lessons-${lesson.orderNumber}`;
	return {
		...lesson,
		id: lessonId,
		exercises: lesson.exercises.map((exercise, n) => mapExercise(lessonId, n, exercise)),
	}
}

const lessons = {
	getOne: async (resource, params) => {
		const id = params.id.replace(/-/g, '/');
		const unitId = params.id.split('-').slice(0, 2).join('-');
		const url = `${apiUrl}/challenges/${await getChallengeId()}/${id}`;
		const lesson = await httpClient(url).then(({json}) => ({
			data: mapLesson(unitId, json),
		}))
		console.log('lesson', lesson)
		return lesson
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
	resources: ["lessons"],
	dataProvider: lessons
};

export default dataProvider;
