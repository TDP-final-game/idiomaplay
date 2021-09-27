const createUser = async (body) => {
	await new Promise(resolve => setTimeout(resolve, 5)); // todo model
};

module.exports = {
	createUser
};
