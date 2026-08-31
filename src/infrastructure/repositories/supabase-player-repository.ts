import type { PlayerRepository } from "../../domain/player-repository.js";
import type { Player } from "../../domain/player.js";
import type { AddPlayerInput } from "../../application/add-player.js";

import { supabase } from "../supabase/supabase-client.js";

export class SupabasePlayerRepository implements PlayerRepository {
    async create(input: AddPlayerInput): Promise<Player> {
        const id = crypto.randomUUID();

        const { data, error } = await supabase
            .from("players")
            .insert({
                id,
                name: input.name,
                phone: input.phone ?? null,
            })
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        if (!data) {
            throw new Error("Player was not created.");
        }

        return {
            name: data.name,
            phone: data.phone ?? undefined,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}