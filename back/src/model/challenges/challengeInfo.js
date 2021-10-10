module.exports = {
    name: {
        type: String,
        required: [true, 'name is required']
    },
    difficulty: {
        type: String,
        required: [true, 'difficulty is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
};
