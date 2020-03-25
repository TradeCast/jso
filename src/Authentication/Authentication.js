// @flow
import EventEmitter from '../EventEmitter'
import {JSO} from '../JSO'
import Fetcher from "../HTTP/Fetcher";
import Config from '../Config';

/**
 * Authentication
 */
export default class Authentication extends EventEmitter {
  jso = null;
  fetcher = null;
  state = 'unauthenticated';

  /**
   * Construct Authentication class
   */
  constructor(config: Config) {
    super()
		this.jso = new JSO(config)
    this.fetcher = new Fetcher(this.jso)
	}

  /**
   * Authenticate user
   */
  authenticate() {
    return this.jso ? this.jso.getToken() : Promise.reject(new Error('JSO not available'))
  }

  /**
   * Logout user
   */
  logout() {

  }
}