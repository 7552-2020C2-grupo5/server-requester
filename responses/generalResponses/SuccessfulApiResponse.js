import {ApiResponse} from "./Response";

export class SuccessfulApiResponse extends ApiResponse {
    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode >= 200 && httpStatusCode < 300;
    }

    hasError() {
        return false;
    }
}