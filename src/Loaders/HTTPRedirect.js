// @flow
import BasicLoader from './BasicLoader'

/**
 * HTTP Redirect Loader
 */
export default class HTTPRedirect extends BasicLoader {
	/**
	 * It executes
	 */
	execute() {
		return new Promise<void>(() => {
			window.location = this.url;
		})
	}
}
