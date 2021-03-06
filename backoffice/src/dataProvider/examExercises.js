import { apiUrl, httpClient } from './utils';

export const mapExercise = (lessonId, exerciseId, exercise) => ({
    ...exercise,
    id: `${lessonId}-exercises-${exerciseId}`,
    orderNumber: parseInt(exerciseId, 10) + 1
})

const examExercises = {
    getOne: async (resource, params) => {
        console.log('PARAMS:', params);
        const id = params.id.split('-')[1];
        const unitOrderNumber = params.id.split('-')[3];
        const exerciseId = params.id.split('-')[5];

        const exercise = await httpClient(`${apiUrl}/challenges/${id}/units/${unitOrderNumber}/exams`).then(({json}) => ({
            data: json.exercises[exerciseId],
        }));

        return { data: { ...exercise.data, id: params.id} };
    },

    getMany: (resource, params) => {
    },

    getManyReference: (resource, params) => {
    },

    update: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({json}) => ({data: json}))
    },

    updateMany: (resource, params) => {
    },

    create: async (resource, params) => {
        const resourceUrl = `/challenges/${params.data.challengeId}/units/${params.data.unitOrderNumber}/exams/exercises`;

        params.data.options.forEach((option) => option['correct'] = option.correct ?? false);

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
    resources: ["examExercises"],
    dataProvider: examExercises
};

export default dataProvider;
