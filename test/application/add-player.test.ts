import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { addPlayer } from "../../src/application/add-player-service.js";
import { InMemoryPlayerRepository } from "../../src/infrastructure/repositories/in-memory-player-repository.js";

describe("AddPlayer", () => {
    it("normalizes the player name and phone before persisting", async () => {
        const repository = new InMemoryPlayerRepository();
        const add = addPlayer(repository);

        const player = await add({
            name: "  tEsT   pLaYeR  ",
            phone: " +91 00000 00000 ",
        });

        assert.equal(player.name, "Test Player");
        assert.equal(player.phone, "+910000000000");
    });

    it("rejects a player with an empty name", async () => {
        const repository = new InMemoryPlayerRepository();
        const add = addPlayer(repository);

        await assert.rejects(
            () => add({ name: "   " }),
            {
                message: "Player name is required.",
            },
        );
    });
});