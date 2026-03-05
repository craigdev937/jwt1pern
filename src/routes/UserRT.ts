import express from "express";
import { USER } from "../controllers/UserCTR";

// ROUTE:   localhost:9000/api/user
export const userRt: express.Router = express.Router();
    userRt.post("/user/register", USER.Register);
    userRt.get("/user", USER.FetchAll);
    userRt.post("/user/login", USER.Login);



    