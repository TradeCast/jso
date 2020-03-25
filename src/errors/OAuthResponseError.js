// @flow
import Error from './Error'

/**
 * OAuthResponseError
 */
export default class OAuthResponseError extends Error {
  error: string;
  description: string;

  /**
   * To string
   */
  toString() {
    const header = this.error || 'unknown';
    const descr = this.description || 'unknown';
    return 'OAuthResponseError: [' + header + ']: ' + descr;
  }
}
