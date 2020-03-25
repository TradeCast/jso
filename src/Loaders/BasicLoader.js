// @flow

/**
 * Basic Loader
 */
export default class BasicLoader {
	url = '';

	/**
	 * It constructs things
	 */
	constructor(url: string) {
		this.url = url
	}

	/**
	 * It executes? Something?
	 */
	execute() {
		return Promise.resolve();
	}
}
