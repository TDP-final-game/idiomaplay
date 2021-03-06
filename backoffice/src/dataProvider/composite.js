class CompositeDataProvider {
	constructor(dataProviders) {
		this.dataProviders = dataProviders;
	}

	_delegate(name, resource, params) {
		const dataProvider = this.dataProviders.find((dp) =>
			dp.resources.includes(resource)
		);

		if (!dataProvider) return Promise.reject(`Provider for resource "${resource}" not found`)

		return dataProvider["dataProvider"][name](resource, params);
	}

	getList(resource, params) {
		return this._delegate("getList", resource, params);
	}

	getOne(resource, params) {
		return this._delegate("getOne", resource, params);
	}

	getMany(resource, params) {
		return this._delegate("getMany", resource, params);
	}

	getManyReference(resource, params) {
		return this._delegate("getManyReference", resource, params);
	}

	create(resource, params) {
		return this._delegate("create", resource, params);
	}

	update(resource, params) {
		return this._delegate("update", resource, params);
	}

	updateMany(resource, params) {
		return this._delegate("updateMany", resource, params);
	}

	delete(resource, params) {
		return this._delegate("delete", resource, params);
	}

	deleteMany(resource, params) {
		return this._delegate("deleteMany", resource, params);
	}
}

export default CompositeDataProvider;
