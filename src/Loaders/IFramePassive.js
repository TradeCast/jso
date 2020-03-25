// @flow
import BasicLoader from './BasicLoader'
import utils from '../utils'

/**
 * Passive iframe loader
 */
export default class IFramePassive extends BasicLoader {
  timeout = 5000;
  callback: (Promise<void> | {[key: string]: string}) => void = utils.noop;
  errorCallback: (err: Error) => void = utils.noop;
  isCompleted: boolean = false;
  id: string = '';
  iframe: HTMLIFrameElement = document.createElement('iframe');

  /**
   * It constructs things
   */
	constructor(url: string) {
		super(url)

		this.isCompleted = false
    this.id = 'jso_passive_iframe_' + utils.uuid()
    this.iframe.setAttribute('id', this.id)
    this.iframe.setAttribute('src', url)

    this.iframe.addEventListener('load', () => {
      let object = null;

      try {
        if (this.iframe.contentWindow.location.hash) {
          const encodedHash = this.iframe.contentWindow.location.hash.substring(1)
          object = utils.parseQueryString(encodedHash)
        } else if (this.iframe.contentWindow.location.search) {
          const encodedHash = this.iframe.contentWindow.location.search.substring(1)
          object = utils.parseQueryString(encodedHash)
        }

        if (object !== null) {
          this._completed(object)
        } else {
          this._failed(new Error("Failed to obtain response value from iframe"))
        }
      } catch(err) {
        // Most likely not able to access the content window because of same-origin policy.
        //
        // Ignore this error, as this is likely to happen during the SSO redirect loop, but the load
        // event may be triggered multiple times, so it is not neccessary a problem that the first is not
        // accessible.
      }

    })

	}

  /**
   * Execute loader
   */
	execute() {
		return new Promise<void>((resolve, reject) => {
			this.callback = resolve;
      this.errorCallback = reject
      document.getElementsByTagName('body')[0].appendChild(this.iframe)

			setTimeout(() => {
				this._failed(new Error("Loading iframe timed out"))
			}, this.timeout)
		})
	}

  /**
   * Clean up
   */
	_cleanup() {
    const element = document.getElementById(this.id);

    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
	}

  /**
   * On fail
   */
  _failed(err: Error): void {
    if (!this.isCompleted) {
			if (this.errorCallback && typeof this.errorCallback === 'function') {
				this.errorCallback(err)
			}
			this.isCompleted = true
			this._cleanup()
		}
  }

  /**
   * On complete
   */
	_completed(response: Promise<void> | {[key: string]: string}) {
		if (!this.isCompleted) {
			if (this.callback && typeof this.callback === 'function') {
				this.callback(response)
			}
			this.isCompleted = true
			this._cleanup()
		}
	}
}
