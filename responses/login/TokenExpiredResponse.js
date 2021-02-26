import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class TokenExpiredResponse extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "Missing password"
        }
    }

   static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 401;
    }

    description() {
        return "Expiró la sesión. Logueate de nuevo para seguir navegando";
    }
}
