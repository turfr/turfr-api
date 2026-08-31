import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {SupabasePlayerRepository} from "../../../src/infrastructure/repositories/supabase-player-repository.js";


describe("SupabasePlayerRepository", () => {
    it("creates a player in Supabase", async () => {
        const repository = new SupabasePlayerRepository();

        const player = await repository.create({
            name: "Test Player",
            phone: "9999999999",
        });

        assert.equal(player.name, "Test Player");
        assert.equal(player.phone, "9999999999");
        assert.ok(player.createdAt instanceof Date);
        assert.ok(player.updatedAt instanceof Date);
    });
});