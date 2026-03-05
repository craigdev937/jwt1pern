import express from "express";
import bcrypt from "bcrypt";
import { dBase } from "../db/Database";
import { signToken } from "../middleware/Auth";
import { RSchema, RType, LSchema, LType } from "../validation/Schema";

class UserClass {
    Register: express.Handler = async (req, res, next) => {
        try {
            const R = RSchema.parse(req.body);
            const ChkEmailQRY = `SELECT * FROM users WHERE email = $1`;
            const user = await dBase.query(ChkEmailQRY, [R.email]);
            if (user.rows.length > 0) {
                return res.status(401).json("User already exists!");
            };
            const salt = await bcrypt.genSalt(10);
            const bPASS = await bcrypt.hash(R.password, salt);
            const QRY = `INSERT INTO users 
            (first, last, email, password) 
            VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [R.first, R.last, R.email, bPASS];
            const newUser = await dBase.query(QRY, values);
            const jwtToken = signToken(newUser.rows[0].user_id);
            return res
                .status(res.statusCode)
                .json({
                    success: true,
                    message: "User is Registered!",
                    data: jwtToken
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Registering User!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    };

    FetchAll: express.Handler = async (req, res, next) => {
        try {
            const QRY = `SELECT * FROM users ORDER BY user_id ASC`;
            const users = await dBase.query<RType[]>(QRY);
            return res
                .status(res.statusCode)
                .json({
                    success: true,
                    message: "All Registered Users!",
                    count: users.rows.length,
                    data: users.rows
                })
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Fetching all Users!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    };

    Login: express.Handler = async (req, res, next) => {
        try {
            const L = LSchema.parse(req.body);
            const QRY = `SELECT * FROM users WHERE email = $1`;
            const user = await dBase.query<LType>(QRY, [L.email]);
            if (user.rows.length === 0) {
                return res.status(401).json({ msg: "Invalid Info" });
            };
            const valPASS = await bcrypt.compare(L.password, 
                user.rows[0].password);
            if (!valPASS) {
                return res.status(401).json({ msg: "Invalid Info" })
            };
            const jwtToken = signToken(user.rows[0].email);
            res.cookie("token", jwtToken, {
                httpOnly: true,
                secure: false,  // set to false if testing.
                sameSite: "strict",  // on localhost without HTTPS
                maxAge: 1000 * 60 * 60 * 24  // 1 day
            });
            return res
                .status(res.statusCode)
                .json({
                    success: true,
                    message: "User is now Logged in!",
                    data: jwtToken
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Logging in User!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    };

    Logout: express.Handler = async (req, res, next) => {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });
            return res
                .status(res.statusCode)
                .json({
                    success: true,
                    message: "User has Logged Out!"
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Logging Out the User!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    };

    GetOne: express.Handler = async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const QRY = `SELECT * FROM users WHERE user_id = $1`;
            const user = await dBase.query<RType>(QRY, [user_id]);
            return res
                .status(res.statusCode)
                .json(user.rows[0]);
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error getting One User!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    };

    Update: express.Handler = async (req, res, next) => {
        try {
            const U = RSchema.parse(req.body);
            const { user_id } = req.params;
            const QRY = `UPDATE users 
            SET first=$1, last=$2, email=$3, password=$4, 
            updated_at=CURRENT_TIMESTAMP 
            WHERE user_id=$5 RETURNING *`;
            const values = [U.first, U.last, U.email, 
                U.password, user_id];
            const user = await dBase.query<RType>(QRY, values);
            return res
                .status(res.statusCode)
                .json({
                    success: true,
                    message: "The User was Updated!",
                    data: user.rows[0]
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Updating the User!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    };
};

export const USER: UserClass = new UserClass();





