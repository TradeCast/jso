// @flow

/**
 * Error class
 */
export default class Error {
	/**
	 * Error constructor
	 */
	constructor(props) {
		for(const key in props) {
			if (Object.prototype.hasOwnProperty.call(props, key)) {
				this[key] = props[key];
			}
		}
	}

	/**
	 * Setter
	 */
	set(key: string, value: mixed) {
		this[key] = value;
		return this;
	}
}