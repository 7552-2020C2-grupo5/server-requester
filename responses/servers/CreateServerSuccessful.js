import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class CreateServerSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            "server_name": "bookings",
            "token": "string"
        };
    }

    description() {
        return "Se ha creado la API KEY. Asegúrese de copiarla porque no podrá volver a visualizarla.";
    }

    token() {
        return this.content().token;
    }
}
