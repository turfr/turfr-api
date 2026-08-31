import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {createPlayerRoute} from "../../src/http/routes/players.js";


describe("POST /players", () => {
    it("adds a player and returns 201", async () => {
        let receivedInput: unknown;

        const addPlayer = async (input: {
            name: string;
            phone?: string;
        }) => {
            receivedInput = input;

            return {
                name: "Amit",
                phone: "9876543210",
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        };

        const route = createPlayerRoute(addPlayer);

        // We'll construct the HTTP request/response here.
    });
});