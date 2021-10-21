import api from './api';

function getLessons(unitOrderNumber, challengeId='6171ef7fe77f0aeb8e6d6bc5') {
    api.get('/users/6171f429e77f0aeb8e6d6bdd/challengeAttempts')
    .then(({data}) => {
        return data[0].unitsAttempts.find(unitAttempt => unitAttempt.unitInfo.orderNumber === unitOrderNumber).lessonsAttempts;
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
