import {ErrorResponse} from "../responses/generalResponses/ErrorResponse.js";
import {GetUsersEndpoint} from "../endpoints/GetUsersEndpoint.js";
import {LoginEndpoint} from "../endpoints/LoginEndpoint";
import {ServerErrorResponse} from "../responses/generalResponses/ServerErrorResponse";
import {GetUserEndpoint} from "../endpoints/GetUserEndpoint";


class ApiClient {
    constructor(requester, onServerErrorDo = () => {
    }) {
        this._requester = requester;
        this._handleServerError = onServerErrorDo;
        this._handleResponse = this._handleResponse.bind(this);
    }

    _handleResponse(response, onResponse) {
        if (response instanceof ServerErrorResponse) {
            console.log("Server error: ", response);
            return this._handleServerError(response);
        }

        return onResponse(response);
    }

    login(data, onResponse) {
        return this._requester.call({
            endpoint: new LoginEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    getUsers(onResponse) {
        return this._requester.call({
            endpoint: new GetUsersEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    profileData(userId, onResponse) {
        return this._requester.call({
            endpoint: new GetUserEndpoint(userId),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }
}

export default ApiClient;