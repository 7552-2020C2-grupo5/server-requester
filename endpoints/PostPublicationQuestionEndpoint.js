import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {PostPublicationQuestionSuccessful} from "../responses/publications/questions/PostPublicationQuestionSuccessful";

export class PostPublicationQuestionEndpoint extends Endpoint {
    constructor(token, publicationId) {
        super(token);
        this._publicationId = publicationId;
    }

    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/publications/' + this._publicationId + '/questions'
    }

    ownResponses() {
        return [PostPublicationQuestionSuccessful];
    }

    method() {
        return 'POST';
    }
}
