import type { AddPlayerInput } from "../../application/add-player.js";
import type { Player } from "../../domain/player.js";
import type { PlayerRepository } from "../../domain/player-repository.js";

export class InMemoryPlayerRepository implements PlayerRepository {
    private players: Player[] = [];

    async create(input: AddPlayerInput): Promise<Player> {
        const now = new Date();

        const player: Player = {
            // id: crypto.randomUUID(),
            name: input.name,
            createdAt: now,
            updatedAt: now,
        };

        if (input.phone !== undefined) {
            player.phone = input.phone;
        }

        this.players.push(player);

        return player;
    }
}