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
import {BlockUserEndpoint} from "../endpoints/BlockUserEndpoint";
import {LoginAdminEndpoint} from "../endpoints/LoginAdminEndpoint";
import {UpdateUserEndpoint} from "../endpoints/UpdateUserEndpoint";
import {UpdatePublicationEndpoint} from "../endpoints/UpdatePublicationEndpoint";
import {PostPublicationEndpoint} from "../endpoints/PostPublicationEndpoint";
import {GetBookingsEndpoint} from "../endpoints/GetBookingsEndpoint";
import {PostBookingEndpoint} from "../endpoints/PostBookingEndpoint";
import {PostPublicationQuestionEndpoint} from "../endpoints/PostPublicationQuestionEndpoint";
import {PostPublicationAnswerEndpoint} from "../endpoints/PostPublicationAnswerEndpoint";
import {StarPublicationEndpoint} from "../endpoints/StarPublicationEndpoint";
import {UnstarPublicationEndpoint} from "../endpoints/UnstarPublicationEndpoint";
import {GetPublicationStarsEndpoint} from "../endpoints/GetPublicationStarsEndpoint";
import {PostUserEndpoint} from "../endpoints/PostUserEndpoint";
import {GetUserReviewsEndpoint} from "../endpoints/GetUserReviewsEndpoint";
import {GetPublicationReviewsEndpoint} from "../endpoints/GetPublicationReviewsEndpoint";
import {AddUserReviewEndpoint} from "../endpoints/AddUserReviewEndpoint";
import {AddPublicationReviewEndpoint} from "../endpoints/AddPublicationReviewEndpoint";
import {RecoverPasswordEndpoint} from "../endpoints/RecoverPasswordEndpoint";
import {GetWalletBalanceEndpoint} from "../endpoints/GetWalletBalanceEndpoint";
import {NewAdminEndpoint} from "../endpoints/NewAdminEndpoint";


class ApiClient {
    constructor(requester, onServerErrorDo = undefined) {
        this._requester = requester;
        this._handleServerError = onServerErrorDo;
        this._handleResponse = this._handleResponse.bind(this);
    }

    _handleResponse(response, onResponse) {
        if (response instanceof ServerErrorResponse) {
            console.log("Server error: ", response);
            if (this._handleServerError !== undefined) {
                return this._handleServerError(response);
            }
        }

        return onResponse(response);
    }

    register(userDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostUserEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: userDetails
        });
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

    blockUser(userId, onResponse)  {
        return this._requester.call({
            endpoint: new BlockUserEndpoint(userId),
            onResponse: (response) => this._handleResponse(response, onResponse),
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

    updatePublication(publicationId, publicationDetails, onResponse) {
        return this._requester.call({
            endpoint: new UpdatePublicationEndpoint(null, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: publicationDetails
        });
    }

    postPublication(publicationDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostPublicationEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: publicationDetails
        });
    }

    blockPublication(publicationId, onResponse)  {
        return this._requester.call({
            endpoint: new BlockPublicationEndpoint(publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    loginAdmin(data, onResponse) {
        return this._requester.call({
            endpoint: new LoginAdminEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    newAdmin(data, onResponse) {
        return this._requester.call({
            endpoint: new NewAdminEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }


    bookings(filters = {}, onResponse) {
        return this._requester.call({
            endpoint: new GetBookingsEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    makeReservation(reservationDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostBookingEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: reservationDetails
        });
    }

    addQuestion(publicationId, questionDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostPublicationQuestionEndpoint(null, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: questionDetails
        });
    }

    addAnswer(publicationId, questionId, answerDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostPublicationAnswerEndpoint(null, publicationId, questionId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: answerDetails
        });
    }

    starPublication(publicationId, userId, onResponse) {
        return this._requester.call({
            endpoint: new StarPublicationEndpoint(null, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {user_id: userId}
        });
    }

    unstarPublication(publicationId, userId, onResponse) {
       return this._requester.call({
            endpoint: new UnstarPublicationEndpoint(null, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {user_id: userId}
        });
    }

    getPublicationStars(publicationId, userId, onResponse) {
        return this._requester.call({
            endpoint: new GetPublicationStarsEndpoint(null, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {user_id: userId}
        });
    }

    publicationReviews(filters={}, onResponse) {
        return this._requester.call({
            endpoint: new GetPublicationReviewsEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    userReviews(filters={}, onResponse) {
        return this._requester.call({
            endpoint: new GetUserReviewsEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    addPublicationReview(reviewDetails, onResponse) {
        return this._requester.call({
            endpoint: new AddPublicationReviewEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: reviewDetails
        });
    }

    addUserReview(reviewDetails, onResponse) {
        return this._requester.call({
            endpoint: new AddUserReviewEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: reviewDetails
        });
    }

    resetPassword(recoverEmail, onResponse) {
        return this._requester.call({
            endpoint: new RecoverPasswordEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {email: recoverEmail}
        });
    }

    walletBalance(walletAddress, onResponse) {
        return this._requester.call({
            endpoint: new GetWalletBalanceEndpoint(null, walletAddress),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }
}

export default ApiClient;
