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

			u			= undefined;

		if (url == u) {
			console.error("Please defined an URL in your object, this is REQUIRED");
			return false;
		}

		if (uri == u)
			var uri = null

		const xhr = new XMLHttpRequest();
		if (beforeSend !== u)
			beforeSend();

		xhr.open('POST', url);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		if (credentials == true) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
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
			if (xhr.status === 200) {
				if (success !== u) {
					succes(xhr.response);
				}
			}
			else if (xhr.status !== 200) {
				if (failed !== u) {
					failed({status: xhr.status, response: xhr.response});
				}
			}
		};

		if (uri !== null) {
			var toEncodeUri;
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

		xhr.send(uri);
		// Send the XHR to a dev if they do request so...
		if (xhrCall !== u)
			xhrCall(xhr);
	}

	static GET(obj=null) {
		if (obj == null) {
			console.error("Give an object for Ajax.GET()");
			return false;
		}

		var
			url 		= obj['url'], // string
			uri 		= obj['data'], // obj

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

			u			= undefined;

		if (url == u) {
			console.error("Please defined an URL in your object, this is REQUIRED");
			return false;
		}

		if (uri == u)
			var uri = null

		const xhr = new XMLHttpRequest();
		if (beforeSend !== u)
			beforeSend();

		xhr.open('GET', url);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		if (credentials == true) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
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
			if (xhr.status === 200) {
				if (success !== u) {
					succes(xhr.response);
				}
			}
			else if (xhr.status !== 200) {
				if (failed !== u) {
					failed({status: xhr.status, response: xhr.response});
				}
			}
		};

		if (uri !== null) {
			var toEncodeUri;
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

		xhr.send(uri);
		// Send the XHR to a dev if they do request so...
		if (xhrCall !== u)
			xhrCall(xhr);
	}
}
