import request from 'reqwest';
import _ from 'lodash';
import appConst from '../config/constants';


const resourceUrl = appConst.apiUrl;
const storageKey = 'cn.token'; //not really a "token" per se

/**
 * @return {Boolean}
 */
export function isAuthenticated() {
	return !!( sessionStorage.getItem(storageKey) );
}

/**
 * @return {String|Null}
 */
function getToken() {
	return sessionStorage.getItem(storageKey);
}

/**
 * creates basic auth header string
 * @param  {Object|String} input
 * @return {String} base64 encoded
 */
function makeAuthHeader(input) {
	if(typeof input === 'object') {
		return btoa(input.username + ':' + input.password);
	}
	else if(typeof input === 'string') {
		return input;
	}
}

/**
 * checks if provided credentials are valid
 * @param  {Object} userObj
 * @return {Promise}
 */
export function authenticate(userObj) {
	
	let basicHeader = makeAuthHeader(userObj);

	return request({
		url: resourceUrl + 'authenticate',
		type: 'json',
		method: 'post',
		contentType: 'application/json',
		headers: {
			Authorization: 'Basic ' + basicHeader
		}
	})
	.then(
		function ok(res) {
			sessionStorage.setItem(storageKey, basicHeader);
		}
	);
}

/**
 * makes a function that makes authorized requests
 * @return {Function}
 */
export function authRequest(reqObj) {
	if(!isAuthenticated()) {
		throw new Error('must be authenticated');
	}

	let authReq = {
		headers: {
			Authorization: 'Basic ' + makeAuthHeader(getToken())
		}
	};

	return request(_.extend(authReq, reqObj));
}


