import express from "express";
import { PLAYER } from "../controllers/PlayCTR";

export const playRt: express.Router = express.Router();
    playRt.post("/players", PLAYER.Create);
    playRt.get("/players", PLAYER.FetchAll);


