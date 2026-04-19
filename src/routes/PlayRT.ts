import express from "express";
import { PLAYER } from "../controllers/PlayCTR.ts";

// ROUTE:   localhost:9000/api/players
export const playRt: express.Router = express.Router();
    playRt.post("/players", PLAYER.Create);
    playRt.get("/players", PLAYER.FetchAll);


