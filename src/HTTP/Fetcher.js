// @flow

import ExpiredTokenError from '../errors/ExpiredTokenError'
import {JSO} from '../JSO';

/**
 * HTTPFetcher
 */
export default class Fetcher {
  jso: JSO | null = null;

  /**
   * It constructs things
   */
	constructor(jso: JSO) {
    this.jso = jso
	}

  /**
   * Fetch
   */
  _fetch(url: string, opts: RequestOptions) {
    return fetch(url, opts)
      .then((response) => {
        if (response.status === 401) {
          throw new ExpiredTokenError()
        }
        return response
      })
  }

  /**
   * Real fetch
   */
	fetch(url: string, opts: RequestOptions, reccur: number = 0) {
    if (reccur > 2) {
      throw new Error("Reccursion error. Expired tokens deleted and tried again multiple times.")
    }
    const getTokenOpts = {}
    let fetchOpts = {
      'mode': ',cors',
    }
    if (opts) {
      fetchOpts = opts
      Object.assign(fetchOpts, opts)
    }
    if (opts && opts.jso) {
      Object.assign(getTokenOpts, opts.jso)
    }

    return !this.jso
      ? Promise.reject(new Error('JSO not available'))
      : this.jso.getToken(getTokenOpts)
          .catch((err) => {
            console.error("Error fetching token to use ", err)
          })
          .then((token) => {
            if (!fetchOpts.headers) {
              fetchOpts.headers = {}
            }
            fetchOpts.headers.Authorization = 'Bearer ' + token.access_token

            return this._fetch(url, fetchOpts)
              .catch((err) => {
                if (err instanceof ExpiredTokenError) {
                  this.jso.wipeTokens()
                  return this.fetch(url, opts, reccur+1)
                }
              })
      })
	}



}
