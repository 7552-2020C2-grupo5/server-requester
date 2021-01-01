import {ApiResponse} from "./Response";

export class ErrorResponse extends ApiResponse {
    static defaultResponse() {
        return {"message": "Error"};
    }

    hasError() {
        return true;
    }

    description() {
        return "Ha ocurrido un error!";
    }
}
