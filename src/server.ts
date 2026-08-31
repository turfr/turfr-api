import { createServer } from "node:http";

import { addPlayer } from "./application/add-player-service.js";
import { SupabasePlayerRepository } from "./infrastructure/repositories/supabase-player-repository.js";
import { createPlayerRoute } from "./http/routes/players.js";

export function createApp() {
    const repository = new SupabasePlayerRepository();
    const add = addPlayer(repository);
    const playerRoute = createPlayerRoute(add);

    return createServer(async (request, response) => {
        if (
            request.method === "POST" &&
            request.url === "/players"
        ) {
            await playerRoute(request, response);
            return;
        }

        response.writeHead(404, {
            "Content-Type": "application/json",
        });

        response.end(JSON.stringify({
            error: "Not found",
        }));
    });
}