import { apiUrl, httpClient } from './utils';

import { mapLesson } from './lessons';

const mapExercise = (challengeId, unitOrderNumber, exerciseId, exercise) => ({
	...exercise,
	id: `${challengeId}-units-${unitOrderNumber}-exercises-${exerciseId}`,
	orderNumber: parseInt(exerciseId, 10) + 1
})

export const mapUnit = (challengeId, unit) => {
	const unitId = `${challengeId}-units-${unit.orderNumber}`;
	return {
		...unit,
		lessons: unit.lessons.map(lesson => mapLesson(unitId, lesson)),
		examExercises: unit.exam.exercises.map((exercise, n) => mapExercise(challengeId, unit.orderNumber, n, exercise)),
		id: unitId
	}
};

const units = {
	getOne: async (resource, params) => {
		const id = params.id.replace(/-/g, '/');
		const challengeId = params.id.split('-').slice(0, 2).join('-');
		const url = `${apiUrl}/${id}`;
		const unit = await httpClient(url).then(({json}) => ({
			data: mapUnit(challengeId, json),
		}));

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


	create: async (resource, params) => {
		const examBody = {
			name: params.data.examName,
			description: params.data.examDescription,
			durationInMinutes: params.data.durationInMinutes
		};

		const unitBody = {
			name: params.data.name,
			description: params.data.description,
			orderNumber: params.data.orderNumber
		};

		const responseUnit = await httpClient(
			`${apiUrl}/challenges/${params.data.challengeId}/${resource}`, {
			method: 'POST',
			body: JSON.stringify(unitBody),
		});

		await httpClient(
			`${apiUrl}/challenges/${params.data.challengeId}/${resource}/${params.data.orderNumber}/exams`, {
				method: 'POST',
				body: JSON.stringify(examBody),
		});

		return { data: { ...params.data, id: responseUnit.json._id} };
	},

	delete: async (resource, params) => {
		const splitParams = params.id.split('-');
		const unit = await httpClient(`${apiUrl}/challenges/${splitParams[1]}/units/${splitParams[3]}`, {
			method: 'DELETE',
		}).then(({json}) => ({data: json}));
		return unit;
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
