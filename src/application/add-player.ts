import type { Player } from "../domain/player.js";

export type AddPlayerInput = {
    name: string;
    phone?: string;
};

export type AddPlayer = (
    input: AddPlayerInput
) => Promise<Player>;