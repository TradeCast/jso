// @flow

const utils = {}

/*
 * Returns epoch, seconds since 1970.
 * Used for calculation of expire times.
 */
utils.epoch = function() {
	return Math.round(new Date().getTime() / 1000.0)
}

utils.debug = false

/*
 * Returns a random string used for state
 */
utils.uuid = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = Math.random()*16|0; const v = c == 'x' ? r : (r&0x3|0x8)
	    return v.toString(16)
	})
}

/*
 * Takes a full url as input and expect it to have an encoded response
 * object as eigther a query string or an encoded fragment.
 * Returns the decoded object, or throws an error if no query string or fragment.
 */
utils.getResponseFromURL = function (url: string) {
  if (url.indexOf('#') !== -1) {
    return utils.parseQueryString(url.substring(url.indexOf('#') + 1))
  } else if (url.indexOf('?') !== -1) {
    return utils.parseQueryString(url.substring(url.indexOf('?') + 1))
  }
  return {}
}

utils.parseQueryString = function (queryString: string): {[key: string]: string} {
	let e;
	const whitespaceRegex = /\+/g;  // Regex for replacing addition symbol with a space
	const regex = /([^&;=]+)=?([^&;]*)/g;

	/**
	 * Decode
	 */
	const decode =  (s: string) => decodeURIComponent(s.replace(whitespaceRegex, " "));
	const urlParams = {}

	while (e = regex.exec(queryString)) {
	   urlParams[decode(e[1])] = decode(e[2])
	};

	return urlParams;
}





/**
 * Utility: scopeList(scopes )
* Takes a list of scopes that might be overlapping, and removed duplicates,
* then concatenates the list by spaces and returns a string.
 *
 * @param scopes [description]
 * @return        [description]
 */
utils.scopeList = function(scopes) {
	return utils.uniqueList(scopes).join(' ')
}


utils.uniqueList = function(items) {
	const uniqueItems = {}
	const resultItems = []
	for(let i = 0; i < items.length; i++) {
		uniqueItems[items[i]] = 1
	}
	for(const key in uniqueItems) {
		if (Object.prototype.hasOwnProperty.call(uniqueItems, key)) {
			resultItems.push(key)
		}
	}
	return resultItems
}



/**
 * A log wrapper, that only logs if logging is turned on in the config
 *
 * @param msg Log message
 */
utils.log = function(...args) {
	if (!console) return
	if (!console.log) return
  	if (!utils.debug) return

  	args.unshift('[JSO]')
	console.log(args)
}

utils.encodeQS = function(params) {
  	let res = ''
	let k; let i = 0
	for(k in params) {
		if (Object.prototype.hasOwnProperty.call(params, k)) {
			res += (i++ === 0 ? '' : '&') + encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
		}
	}
	return res
}

/*
 * Takes an URL as input and a params object.
 * Each property in the params is added to the url as query string parameters
 */
utils.encodeURL = function(url, params) {
	let res = url
	let k; let i = 0
	const firstSeparator = (url.indexOf("?") === -1) ? '?' : '&'
	for(k in params) {
		if (Object.prototype.hasOwnProperty.call(params, k)) {
			res += (i++ === 0 ? firstSeparator : '&') + encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
		}
	}
	return res
}

utils.noop = function() {};
utils.test = function(){return '1.0.0'}
export default utils
