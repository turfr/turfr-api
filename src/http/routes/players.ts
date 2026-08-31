import type { IncomingMessage, ServerResponse } from "node:http";

import type { AddPlayer } from "../../application/add-player.js";

export function createPlayerRoute(
    addPlayer: AddPlayer,
) {
    return async (
        request: IncomingMessage,
        response: ServerResponse,
    ): Promise<void> => {
        try {
            const body = await readJson(request);
            const input = parseAddPlayerInput(body);

            const player = await addPlayer(input);

            response.writeHead(201, {
                "Content-Type": "application/json",
            });

            response.end(JSON.stringify(player));
        } catch (error: unknown) {
            const message = error instanceof Error
                ? error.message
                : "Internal server error";

            response.writeHead(400, {
                "Content-Type": "application/json",
            });

            response.end(JSON.stringify({
                error: message,
            }));
        }
    };
}

async function readJson(
    request: IncomingMessage,
): Promise<Record<string, unknown>> {
    const chunks: Buffer[] = [];

    for await (const chunk of request) {
        chunks.push(Buffer.from(chunk));
    }

    const body = JSON.parse(Buffer.concat(chunks).toString("utf-8"));

    if (typeof body !== "object" || body === null) {
        throw new Error("Request body must be an object.");
    }

    return body as Record<string, unknown>;
}


function parseAddPlayerInput(
    body: Record<string, unknown>,
): {
    name: string;
    phone?: string;
} {
    if (typeof body.name !== "string") {
        throw new Error("Player name is required.");
    }

    if (
        body.phone !== undefined &&
        typeof body.phone !== "string"
    ) {
        throw new Error("Phone must be a string.");
    }

    return {
        name: body.name,
        ...(body.phone !== undefined && {
            phone: body.phone,
        }),
    };
}