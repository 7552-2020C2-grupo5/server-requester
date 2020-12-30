export class ApiResponse {
    static understandThis(jsonResponse, httpStatusCode) {
        throw new Error("You have to implement the method");
    }

    constructor(jsonResponse, httpStatusCode) {
        this._jsonResponse = jsonResponse;
        this._httpStatusCode = httpStatusCode;
    }

    hasError() {
        throw new Error("You have to implement the method");
    }

    content() {
        return this._jsonResponse;
    }

    httpStatusCode() {
        return this._httpStatusCode
    }
}