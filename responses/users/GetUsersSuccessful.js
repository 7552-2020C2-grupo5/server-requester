import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class GetUsersSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return [
            {
                "id": 1,
                "first_name": "Ariel",
                "last_name": "Vergara",
                "profile_picture": "https://reqres.in/img/faces/2-image.jpg",
                "email": "email@email",
                "register_date": "2020-12-31T21:01:52.246Z",
                "blocked": false,
            }
        ];
    }

    users() {
        return this.content().map(
            (user) => {
                return {
                    ...user,
                    status: this._translateStatus(user.blocked)
                }
            }
        )
    }

    _translateStatus(isBlocked) {
        return isBlocked ? "Bloqueado" : "Activo";
    }
}