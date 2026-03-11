import express from "express";
import { USER } from "../controllers/UserCTR";
import { AUTH } from "../middleware/Auth";

// ROUTE:   localhost:9000/api/user
export const userRt: express.Router = express.Router();
    userRt.post("/user/register", USER.Register);
    userRt.post("/user/login", USER.Login);
    userRt.post("/user/logout", USER.Logout);
    userRt.get("/user", USER.FetchAll);
    userRt.get("/user/:user_id", USER.GetOne);
    userRt.put("/user/:user_id", AUTH, USER.Update);
    userRt.delete("/user/:user_id", USER.Delete);



    