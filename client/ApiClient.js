import {GetUsersEndpoint} from "../endpoints/GetUsersEndpoint.js";
import {UserLoginEndpoint} from "../endpoints/UserLoginEndpoint";
import {UserLogoutEndpoint} from "../endpoints/UserLogoutEndpoint";
import {ServerErrorResponse} from "../responses/generalResponses/ServerErrorResponse";
import {GetUserEndpoint} from "../endpoints/GetUserEndpoint";
import {GetPublicationsEndpoint} from "../endpoints/GetPublicationsEndpoint";
import {GetPublicationEndpoint} from "../endpoints/GetPublicationEndpoint";
import {BlockPublicationEndpoint} from "../endpoints/BlockPublicationEndpoint";
import {GetAdminsEndpoint} from "../endpoints/GetAdminsEndpoint";
import {GetAdminEndpoint} from "../endpoints/GetAdminEndpoint";
import {UpdateUserEndpoint} from "../endpoints/UpdateUserEndpoint";


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

    userLogin(data, onResponse) {
        return this._requester.call({
            endpoint: new UserLoginEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    userLogout(token, onResponse) {
        return this._requester.call({
            endpoint: new UserLogoutEndpoint(token),
            onResponse: (response) => this._handleResponse(response, onResponse)
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

    updateProfileData(userId, userData, onResponse) {
        return this._requester.call({
            endpoint: new UpdateUserEndpoint(userId, userData),
            data: userData,
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    getAdmins(onResponse) {
        return this._requester.call({
            endpoint: new GetAdminsEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    getAdminProfile(adminId, onResponse) {
        return this._requester.call({
            endpoint: new GetAdminEndpoint(adminId),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    publications(onResponse, filters={})  {
        return this._requester.call({
            endpoint: new GetPublicationsEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    getPublication(publicationId, onResponse)  {
        return this._requester.call({
            endpoint: new GetPublicationEndpoint(publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    blockPublication(publicationId, onResponse)  {
        return this._requester.call({
            endpoint: new BlockPublicationEndpoint(publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }
}

export default ApiClient;
