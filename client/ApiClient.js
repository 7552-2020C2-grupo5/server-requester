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
import {RejectBookingEndpoint} from "../endpoints/RejectBookingEndpoint";
import {AcceptBookingEndpoint} from "../endpoints/AcceptBookingEndpoint";
import {IntentBookingEndpoint} from "../endpoints/IntentBookingEndpoint";
import {NotificationsEndpoint} from "../endpoints/NotificationsEndpoint";
import {NewAdminEndpoint} from "../endpoints/NewAdminEndpoint";


class ApiClient {
    constructor(requester, onServerErrorDo = undefined, token = undefined) {
        this._requester = requester;
        this._token = token;
        this._handleServerError = onServerErrorDo;
        this._handleResponse = this._handleResponse.bind(this);
    }

    setToken(token) {
        this._token = token;
    }

    hasToken() {
        return this._token !== undefined;
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
            endpoint: new PostUserEndpoint(this._token),
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
            endpoint: new UserLogoutEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    getUsers(onResponse, filters={}) {
        return this._requester.call({
            endpoint: new GetUsersEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
       });
    }

    profileData(userId, onResponse) {
        return this._requester.call({
            endpoint: new GetUserEndpoint(this._token, userId),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    updateProfileData(userId, userData, onResponse) {
        return this._requester.call({
            endpoint: new UpdateUserEndpoint(this._token, userId, userData),
            data: userData,
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    blockUser(userId, onResponse)  {
        return this._requester.call({
            endpoint: new BlockUserEndpoint(this._token, userId),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    getAdmins(onResponse, filters={}) {
        return this._requester.call({
            endpoint: new GetAdminsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    getAdminProfile(adminId, onResponse) {
        return this._requester.call({
            endpoint: new GetAdminEndpoint(this._token, adminId),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    publications(onResponse, filters={})  {
        debugger;
        return this._requester.call({
            endpoint: new GetPublicationsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    getPublication(publicationId, onResponse)  {
        return this._requester.call({
            endpoint: new GetPublicationEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    updatePublication(publicationId, publicationDetails, onResponse) {
        return this._requester.call({
            endpoint: new UpdatePublicationEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: publicationDetails
        });
    }

    postPublication(publicationDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostPublicationEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: publicationDetails
        });
    }

    blockPublication(publicationId, onResponse)  {
        return this._requester.call({
            endpoint: new BlockPublicationEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    loginAdmin(data, onResponse) {
        return this._requester.call({
            endpoint: new LoginAdminEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    newAdmin(data, onResponse) {
        return this._requester.call({
            endpoint: new NewAdminEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }


    bookings(filters = {}, onResponse) {
        return this._requester.call({
            endpoint: new GetBookingsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    makeReservation(reservationDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostBookingEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: reservationDetails
        });
    }

    addQuestion(publicationId, questionDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostPublicationQuestionEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: questionDetails
        });
    }

    addAnswer(publicationId, questionId, answerDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostPublicationAnswerEndpoint(this._token, publicationId, questionId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: answerDetails
        });
    }

    starPublication(publicationId, userId, onResponse) {
        return this._requester.call({
            endpoint: new StarPublicationEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {user_id: userId}
        });
    }

    unstarPublication(publicationId, userId, onResponse) {
       return this._requester.call({
            endpoint: new UnstarPublicationEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {user_id: userId}
        });
    }

    getPublicationStars(publicationId, userId, onResponse) {
        return this._requester.call({
            endpoint: new GetPublicationStarsEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {user_id: userId}
        });
    }

    publicationReviews(filters={}, onResponse) {
        return this._requester.call({
            endpoint: new GetPublicationReviewsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    userReviews(filters={}, onResponse) {
        return this._requester.call({
            endpoint: new GetUserReviewsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    addPublicationReview(reviewDetails, onResponse) {
        return this._requester.call({
            endpoint: new AddPublicationReviewEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: reviewDetails
        });
    }

    addUserReview(reviewDetails, onResponse) {
        return this._requester.call({
            endpoint: new AddUserReviewEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: reviewDetails
        });
    }

    resetPassword(recoverEmail, onResponse) {
        return this._requester.call({
            endpoint: new RecoverPasswordEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {email: recoverEmail}
        });
    }

    walletBalance(walletAddress, onResponse) {
        return this._requester.call({
            endpoint: new GetWalletBalanceEndpoint(this._token, walletAddress),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    intentBooking(data, onResponse) {
        return this._requester.call({
            endpoint: new IntentBookingEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    rejectBooking(data, onResponse) {
        return this._requester.call({
            endpoint: new RejectBookingEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    acceptBooking(data, onResponse) {
        return this._requester.call({
            endpoint: new AcceptBookingEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    ackNewMessage(data, onResponse) {
        return this._requester.call({
            endpoint: new NotificationsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }
}

export default ApiClient;
