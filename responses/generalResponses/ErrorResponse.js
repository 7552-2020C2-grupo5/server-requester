import {ApiResponse} from "./Response";

export class ErrorResponse extends ApiResponse {
    static defaultResponse() {
        return {"message": "Error"};
    }

    hasError() {
        return true;
    }

    description() {
        throw new Error("You have to implement the method");
    }
}
