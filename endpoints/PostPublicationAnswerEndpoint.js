import {Endpoint} from "./Endpoint.js";
import {PUBLICATIONS_BASE_ENDPOINT} from "../requester";
import {PostPublicationAnswerSuccessful} from "../responses/publications/questions/PostPublicationAnswerSuccessful";

export class PostPublicationAnswerEndpoint extends Endpoint {
    constructor(token, publicationId, questionId) {
        super(token);
        this._publicationId = publicationId;
        this._questionId = questionId;
    }

    url() {
        return (
            PUBLICATIONS_BASE_ENDPOINT + '/publications/' + this._publicationId + '/questions/' + this._questionId
        );
    }

    ownResponses() {
        return [PostPublicationAnswerSuccessful];
    }

    method() {
        return 'PATCH';
    }
}
