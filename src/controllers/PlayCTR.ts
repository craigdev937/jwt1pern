import express from "express";
import { dBase } from "../db/Database.ts";
import { PSchema } from "../validation/Schema.ts";
import type { PType, RType } from "../validation/Schema.ts";

class PlayerClass {
    Create: express.Handler = async (req, res, next) => {
        try {
            const P = PSchema.parse(req.body);
            const QRY = `INSERT INTO players 
            (user_id, name, description, image) 
            VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [P.user_id, P.name, P.description, P.image];
            const player = await dBase.query<PType>(QRY, values);
            return res
                .status(res.statusCode)
                .json({
                    success: true,
                    message: "The Player was Created!",
                    data: player.rows[0]
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Creating Player!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    };

    FetchAll: express.Handler = async (req, res, next) => {
        try {
            const QRY = `SELECT * FROM players ORDER BY player_id ASC`;
            const players = await dBase.query<PType>(QRY);
            return res
                .status(res.statusCode)
                .json({
                    success: true,
                    count: players.rows.length,
                    message: "All Players Listed!",
                    data: players.rows
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Fetching All Players!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    };
};

export const PLAYER: PlayerClass = new PlayerClass();


