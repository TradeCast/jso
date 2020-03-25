// @flow

/**
 * Config
 */
export default class Config {
	config = {};

	/**
	 * It constructs things
	 */
	constructor(...args) {
		for(let i = 0; i < args.length; i++) {
			Object.assign(this.config, args[i]);
		}
	}

	/**
	 * Check if config has key
	 */
	has(key: string) {
		let pointer = this.config
		const splittedKeys = key.split('.')
		let i = 0
		for(i = 0; i < splittedKeys.length; i++) {
			if (Object.prototype.hasOwnProperty.call(pointer, splittedKeys[i])) {
				pointer = pointer[splittedKeys[i]]
			} else {
				return false
			}
		}

		return true
	}

	/**
	 * Gets value
	 */
	getValue(key: string, defaultValue: mixed, isRequiredParam?: boolean) {
		const isRequired = Boolean(isRequiredParam)
		let pointer = this.config
		const splittedKeys = key.split('.')
		let i = 0
		for(i = 0; i < splittedKeys.length; i++) {
			if (Object.prototype.hasOwnProperty.call(pointer, splittedKeys[i])) {
				pointer = pointer[splittedKeys[i]]
			} else {
				pointer = undefined
				break
			}
		}

		if (typeof pointer === 'undefined') {
			if (isRequired) {
				throw new Error("Configuration option [" + splittedKeys[i] + "] required but not provided.")
			}
			return defaultValue
		}
		return pointer
	}
}
