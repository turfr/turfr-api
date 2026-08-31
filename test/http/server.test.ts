import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { createApp } from "../../src/server.js";

describe("POST /players", () => {
    it("creates a player through the HTTP API", async () => {
        const server = createApp();

        await new Promise<void>((resolve) => {
            server.listen(0, resolve);
        });

        const address = server.address();

        if (address === null || typeof address === "string") {
            throw new Error("Could not determine server address.");
        }

        try {
            const response = await fetch(
                `http://localhost:${address.port}/players`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: "  aMiT  ",
                        phone: "9876543210",
                    }),
                },
            );

            assert.equal(response.status, 201);

            const player = await response.json();

            assert.equal(player.name, "Amit");
            assert.equal(player.phone, "9876543210");
        } finally {
            server.close();
        }
    });
});