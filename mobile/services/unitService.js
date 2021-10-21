import api from './api';

function getLessons(unitOrderNumber, challengeId='6171ef7fe77f0aeb8e6d6bc5') {
    api.get(`/challenges/${challengeId}/`)
    .then(({data}) => {
        return data.units.find(unit => unit.unitInfo.orderNumber === unitOrderNumber).lessons;
    })
    .catch(err => console.log(err))
}

export default {
    getLessons: getLessons
};

// "lessons": Array [
//     Object {
//     "exercises": Array [],
//         "lessonInfo": Object {
//         "description": "Leccion segunda",
//             "name": "Leccion 1",
//             "orderNumber": 1,
//     },
// },
// ],
