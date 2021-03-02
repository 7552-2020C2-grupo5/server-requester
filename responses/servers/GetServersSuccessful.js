import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class GetServersSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return [
            {
                "id": 1,
                "server_name": "bookings",
                "blocked": true,
                "created_at": "2021-03-01T00:54:14.592Z",
                "blocked_at": "2021-03-01T00:54:14.592Z"
            }
        ];
    }

    servers() {
        return this.content().map(
            (server) => {
                return {
                    id: server.id,
                    serverName: server.server_name,
                    isBlocked: server.blocked,
                    status: this.status(server.blocked),
                    createdAt: server.created_at,
                    blockedAt: server.blocked_at,
                }
            }
        );
    }

    status(isBlocked) {
        return isBlocked ? "Bloqueado" : "Activo";
    }
}