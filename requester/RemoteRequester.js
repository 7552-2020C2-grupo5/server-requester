import {Requester} from "./Requester.js";

class RemoteRequester extends Requester {
    call({endpoint, onResponse, data = undefined}) {
        const request = this._buildRequest(endpoint, data);
        let url = endpoint.url();
        if (endpoint.method() === 'GET' && this._hasQueryStringArguments(data)) {
            url += "?" + this._dataToQueryString(data);
        }

        console.log('Request: %s with %s', url, request)
        return fetch(url, request).then(response => {
            let clone = response.clone()
            clone.text().then(text =>
                console.log('Response: %s with body %s', response.status, text)
            )
            return response.json().then(jsonResponse => {
                return this._buildResponse(jsonResponse, endpoint, response)
            })
        }).then(response => {
            return onResponse(response);
        })
        /***
         * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful
         *
         * A fetch() promise will reject with a TypeError when a network error is encountered or CORS is
         * misconfigured on the server-side, although this usually means permission issues or similar —
         * a 404 does not constitute a network error, for example.
         *
         ***/
        .catch(exception => {
            //TODO. podríamos levantar hacer una response genérica que handlee los 500
            console.log("Exception in API request: ", exception);
        })
    }

    _hasQueryStringArguments(data) {
        return data && Object.keys(data).length > 0;
    }

    _buildRequest(endpoint, data) {
        let headers = this._buildHeadersFor(endpoint);
        let requestOptions = {
            method: endpoint.method(),
            headers: headers
        };

        if (endpoint.method() !== 'GET') {
            let encoder = this._encoderFor(endpoint.contentType());
            Object.assign(headers, encoder.headers());
            Object.assign(requestOptions, {body: encoder.encode(data)});
        }
        return requestOptions;
    }

    _buildResponse(jsonResponse, endpoint, response) {
        let endpointResponse = undefined;
        const availableResponsesForEndpoint = endpoint.ownResponses();
        const httpStatusCode = response.status;
        for (let responseType of availableResponsesForEndpoint) {
            if (responseType.understandThis(jsonResponse, httpStatusCode)) {
                endpointResponse = new responseType(jsonResponse, httpStatusCode);
                break;
            }
        }
        if (endpointResponse === undefined) {
            throw new Error("This type of response wasn't expected");
        }

        return endpointResponse;
    }

    _buildHeadersFor(endpoint) {
        let headers = {};
        if (endpoint.contentType() && endpoint.contentType() !== "multipart/form-data"
            && endpoint.method() !== 'GET') {
            headers['Content-Type'] = endpoint.contentType();
        }
        if (endpoint.needsAuthorization()) {
            headers['Authorization'] = endpoint.token();
        }

        return headers;
    }

    _dataToQueryString(data) {
        let keyValuePairs = [];
        for (let i = 0; i < Object.keys(data).length; i += 1) {
            let key = Object.keys(data)[i];
            let value = Object.values(data)[i];
            if (value) {
                keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        }
        return keyValuePairs.join('&');
    }

    _encoderFor(contentType) {
        let encoders = [new JsonEncoder(), new MultiPartEncoder()];
        return encoders.find(enc => enc.accepts(contentType));
    }
}

class Encoder {
    accepts(mimeType) {
        throw new Error("You have to implement the method");
    }

    headers() {
        throw new Error("You have to implement the method");
    }

    encode(requestBody) {
        throw new Error("You have to implement the method");
    }
}

class MultiPartEncoder extends Encoder {
    accepts(mimeType) {
        return mimeType === 'multipart/form-data'
    }

    headers() {
        return {}
    }

    encode(requestBody) {
        let formData = new FormData();

        for (let field in requestBody) {
            let value = requestBody[field];

            if (value !== undefined) {
                formData.append(field, value);
            }
        }

        return formData;
    }

    _generateBodyFromFiles(files) {
        let formData = new FormData();
        Object.keys(files).forEach(key => {
            const file = files[key];
            formData.append(key, file);
        });
        return formData
    }
}

class JsonEncoder extends Encoder {
    accepts(mimeType) {
        return mimeType === 'application/json'
    }

    headers() {
        return {'Content-Type': 'application/json'}
    }

    encode(requestBody) {
        return JSON.stringify(requestBody);
    }
}

export default RemoteRequester;
