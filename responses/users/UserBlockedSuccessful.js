import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse";

export class UserBlockedSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            "message": "User successfully blocked"

        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 200;
    }

    description() {
        return "El usuario fue bloqueado.";
    }
}