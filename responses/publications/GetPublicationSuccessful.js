import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class GetPublicationSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            "loc": {
                "latitude": -34.9964963,
                "longitude": -64.9672817
            },
            "publication_date": "2020-12-28T04:29:56.474443",
            "questions": [],
            "id": 25,
            "user_id": 33,
            "title": "Titulo",
            "description": "Descripción",
            "rooms": 30,
            "beds": 20,
            "bathrooms": 10,
            "price_per_night": 100,
            "images": [
                {
                    "url": "https://firebasestorage.googleapis.com/v0/b/bookbnb-3c67c.appspot.com/o/db7f1c02-fa26-4e4f-ab76-e62c45a9708c?alt=media&token=f9e81c45-f770-4ba7-a130-97673c299555",
                    "id": "6487cc03-7e1b-4add-a250-fe2424754171"
                }
            ]
        };
    }
}