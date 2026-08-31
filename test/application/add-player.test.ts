import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { addPlayer } from "../../src/application/add-player-service.js";
import { InMemoryPlayerRepository } from "../../src/infrastructure/repositories/in-memory-player-repository.js";

describe("AddPlayer", () => {
    it("normalizes the player name before persisting", async () => {
        const repository = new InMemoryPlayerRepository();
        const add = addPlayer(repository);

        const player = await add({
            name: "  aMiT  ",
            phone: "9876543210",
        });

        assert.equal(player.name, "Amit");
        assert.equal(player.phone, "9876543210");
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