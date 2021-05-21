/**
 * Mandatory class to extend from for most class in this project
 * <br>Usage: `class MyClass extends {@link BaseClass}`
 * @class Common/BaseClass
 */
class BaseClass {
	/**
	 * @property {Function} setDefinedKeys
	 * @description to 'seal' the created object and set definedKeys
	 * @returns void
	 */
	setDefinedKeys() {
		const definedKeys = Object.keys(this)
		this.definedKeys = definedKeys.filter((key) => key !== 'definedKeys')
		Object.seal(this)
	}

	/**
	 * @property {Function} getDefinedKeys
	 * @description get a copy of definedKeys
	 * @returns void
	 */
	getDefinedKeys() {
		const self = this
		const cloneDefinedKeys = {}
		self.definedKeys.forEach((key) => {
			if (self[key] && typeof self[key].toJson !== 'undefined') {
				// Assigning object
				cloneDefinedKeys[key] = self[key].getDefinedKeys()
			} else {
				// Assigning primitive type
				cloneDefinedKeys[key] = key
			}
		})
		return cloneDefinedKeys
	}

	/**
	 * @property {Function} toJson
	 * @description returns a clone json representation of the class
	 * @returns {Object} a json object
	 */
	toJson() {
		function hasToJsonFunction(field) {
			return field && typeof field.toJson !== 'undefined'
		}
		const self = this
		const response = {}
		self.definedKeys.forEach((key) => {
			if (hasToJsonFunction(self[key])) {
				// Assigning object
				response[key] = self[key].toJson()
			} else if (Array.isArray(self[key])) {
				// Handle array scenario
				const result = []
				self[key].forEach((item) => {
					if (hasToJsonFunction(item)) {
						// Assigning object
						result.push(item.toJson())
					} else {
						// Assigning primitive type
						result.push(item)
					}
				})
				response[key] = result
			} else {
				// Assigning primitive type
				response[key] = self[key]
			}
		})
		return response
	}

	/**
	 * @property {Function} toStringify
	 * @description returns a stringify json representation of the class
	 * @returns {String} a stringify object of json
	 */
	toStringify() {
		const self = this
		const response = {}
		self.definedKeys.forEach((key) => {
			if (self[key] && typeof self[key].toJson !== 'undefined') {
				// Assigning object
				response[key] = self[key].toJson()
			} else {
				// Assigning primitive type
				response[key] = self[key]
			}
		})
		return response ? JSON.stringify(response) : ''
	}

	/**
	 * @property {Function} fromJson
	 * @description Assign defined fields from whatever is available from json object
	 * @param {Object} jsonObj - any json object'
	 * @returns void
	 */
	fromJson(jsonObj) {
		if (!jsonObj) {
			return
		}

		if (!(jsonObj instanceof Object) || Array.isArray(jsonObj)) {
			// throw Error('Invalid fromJson input')
			return
		}

		Object.keys(jsonObj).forEach((key) => {
			if (this.definedKeys.includes(key)) {
				this[key] = jsonObj[key]
			}
		})
	}

	/**
	 * @property {Function} construct
	 * @description Assign defined fields from whatever is available from json object
	 * @param {Object} jsonObj - any json object'
	 * @returns itself
	 */
	construct(jsonObj) {
		this.fromJson(jsonObj)
		return this
	}
}

export default BaseClass
