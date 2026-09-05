import type { Player } from "../domain/player.js";
import type { AddPlayer, AddPlayerInput } from "./add-player.js";
import type { PlayerRepository } from "../domain/player-repository.js";
import { normalizePlayerName, normalizePlayerPhone } from "../domain/player-normalization.js";
import { validatePlayerName } from "../domain/player-validation.js";

export function addPlayer(
    repository: PlayerRepository,
): AddPlayer {
    return async (input: AddPlayerInput): Promise<Player> => {
        const name = normalizePlayerName(input.name);

        const result = validatePlayerName(name);

        if (!result.isValid) {
            throw new Error(result.message);
        }

        const normalizedInput: AddPlayerInput = {
            name,
        };

        if (input.phone !== undefined) {
            const phone = normalizePlayerPhone(input.phone);

            if (phone.length > 0) {
                normalizedInput.phone = phone;
            }
        }

        return repository.create(normalizedInput);
    };
}