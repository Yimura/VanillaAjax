class Ajax {
	constructor() {}

	static POST(obj=null) {
		if (obj == null) {
			console.error("Give an object for Ajax.POST()");
			return false;
		}

		var
			url 		= obj['url'], // string
			uri 		= obj['data'], // obj
			isAsync		= obj['async'], // boolean

			timeout 	= obj['timeout'], // int
			ontimeout 	= obj['ontimeout'], // callback

			credentials	= obj['credentials'], // boolean
			username	= obj['username'], // string
			password	= obj['password'], // string

			// Callbacks
			beforeSend	= obj['beforeSend'],
			xhrCall 	= obj['xhr'],
			success 	= obj['success'],
			failed 		= obj['failed'],

			special	= null,
			u		= undefined;

		if (url == u) {
			console.error("Please define an URL in your object, this is REQUIRED");
			return false;
		}

		if (uri == u) uri = null;
		if (isAsync == u) isAsync = true;

		const xhr = new XMLHttpRequest();
		// Send the XHR to a dev if they do request so...
		if (xhrCall !== u) xhrCall(xhr);

		if (beforeSend !== u) beforeSend();

		xhr.open('POST', url, isAsync);
		// A check if the FormData doesn't contain Files otherwise we won't set the Content-Type
		if (uri instanceof FormData) {
			for(var pair of uri.entries()) {
				if (!(pair[1] instanceof File)) {
					xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					break;
				}
				else {
					special = "file";
				}
			}
		}
		else {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		if (credentials == true) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
		}

		if (timeout !== u) {
			xhr.timeout = timeout;
			xhr.ontimeout = function(e) {
				if (ontimeout !== null) {
					ontimeout(e);
				}
			};
		}

		xhr.onload = function() {
			if (xhr.status === 200 && success !== u) {
				success(xhr.response);
			}
			else if (xhr.status !== 200 && failed !== u) {
				failed({status: xhr.status, response: xhr.response});
			}
		};

		var toEncodeUri = "";
		if (uri instanceof FormData && special == "file") {
			xhr.send(uri);
		}
		else if (uri instanceof FormData) {
			for(var pair of uri.entries()) {
				if (toEncodeUri !== "")
					toEncodeUri += "&" + pair[0] + "=" + pair[1];
				else
					toEncodeUri = pair[0] + "=" + pair[1];
			}
			xhr.send(encodeURI(toEncodeUri));
		}
		else if (Array.isArray(uri) != true) {
			for (var key in uri) {
				if (uri.hasOwnProperty(key)) {
					if (toEncodeUri !== "")
						toEncodeUri += "&" + key + "=" + uri[key];
					else
						toEncodeUri = key + "=" + uri[key];
				}
			}
			xhr.send(encodeURI(toEncodeUri));
		}
		else if (Array.isArray(uri) == true) {
			for (var i = 0; i < uri.length; i++) {
				if (toEncodeUri !== "")
					toEncodeUri += "&" + uri[i].name + "=" + uri[i].value;
				else
					toEncodeUri = uri[i].name + "=" + uri[i].value;
			}
			xhr.send(encodeURI(toEncodeUri));
		}
		else
			xhr.send(uri);

		return xhr;
	}

	static GET(obj=null) {
		if (obj == null) {
			console.error("Give an object for Ajax.POST()");
			return false;
		}

		var
			url 		= obj['url'], // string
			uri 		= obj['data'], // obj
			isAsync		= obj['async'], // boolean

			timeout 	= obj['timeout'], // int
			ontimeout 	= obj['ontimeout'], // callback

			credentials	= obj['credentials'], // boolean
			username	= obj['username'], // string
			password	= obj['password'], // string

			// Callbacks
			beforeSend	= obj['beforeSend'],
			xhrCall 	= obj['xhr'],
			success 	= obj['success'],
			failed 		= obj['failed'],

			u		= undefined;

		if (url == u) {
			console.error("Please define an URL in your object, this is REQUIRED");
			return false;
		}

		if (uri == u) uri = null;
		if (isAsync == u) isAsync = true;

		const xhr = new XMLHttpRequest();
		// Send the XHR to a dev if they do request so...
		if (xhrCall !== u) xhrCall(xhr);

		if (beforeSend !== u) beforeSend();

		xhr.open('GET', url, isAsync);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		if (credentials == true) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
		}

		if (timeout !== u) {
			xhr.timeout = timeout;
			xhr.ontimeout = function(e) {
				if (ontimeout !== null) {
					ontimeout(e);
				}
			};
		}

		xhr.onload = function() {
			if (xhr.status === 200 && success !== u) {
				success(xhr.response);
			}
			else if (xhr.status !== 200 && failed !== u) {
				failed({status: xhr.status, response: xhr.response});
			}
		};

		var toEncodeUri;
		if (uri instanceof FormData) {
			xhr.send(uri);
		}
		else if (uri != null && Array.isArray(uri) != true) {
			for (var key in uri) {
				if (uri.hasOwnProperty(key)) {
					if (toEncodeUri !== "")
						toEncodeUri += "&" + key + "=" + uri[key];
					else
						toEncodeUri = key + "=" + uri[key];
				}
			}
			xhr.send(encodeURI(toEncodeUri));
		}
		else if (Array.isArray(uri) == true) {
			for (var i = 0; i < uri.length; i++) {
				if (toEncodeUri !== "")
					toEncodeUri += "&" + uri[i].name + "=" + uri[i].value;
				else
					toEncodeUri = uri[i].name + "=" + uri[i].value;
			}
			xhr.send(encodeURI(toEncodeUri));
		}
		else
			xhr.send(uri);

		return xhr;
	}
}
