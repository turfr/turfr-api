import type { AddPlayerInput } from "../application/add-player.js";
import type { Player } from "./player.js";

export interface PlayerRepository {
    create(input: AddPlayerInput): Promise<Player>;

}