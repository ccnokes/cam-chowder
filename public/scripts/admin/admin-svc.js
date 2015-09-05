import axios from 'axios';
import _ from 'lodash';
import appConst from '../config/constants';


const resourceUrl = appConst.apiUrl;
var token; //not really a "token"


/**
 * @return {Boolean}
 */
export function isAuthenticated() {
	return !!(token);
}

/**
 * @return {String|Null}
 */
export function getToken() {
	return token;
}

/**
 * creates basic auth header string
 * @param  {Object|String} input
 * @return {String} base64 encoded
 */
export function makeAuthHeader(input) {
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

	return axios({
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
			token = basicHeader;
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

	return axios(_.extend(authReq, reqObj));
}
