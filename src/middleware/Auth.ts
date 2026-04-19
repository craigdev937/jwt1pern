import express from "express";
import jwt from "jsonwebtoken";
import { dBase } from "../db/Database.ts";
import type { RType } from "../validation/Schema.ts";
const JWT = process.env.JWT_SECRET ?? "";

export const signToken = (user_id: string) => jwt.sign({ user_id }, 
        `${JWT}`, { expiresIn: "1d" }
    );

function parseJwt(token: string) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64")
        .toString());
}

export const AUTH: express.Handler = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res
        .sendStatus(401)
        .json({ msg: "Auth Denied!" });

    jwt.verify(token,
        `${JWT}`, (err) => {
            if (err) return res.sendStatus(403);
            req.body.user = parseJwt(token).user_id;
            next();
        });
};

interface DecodedToken {
    user_id: string,
    iat: number,
    exp: number
};

export interface AU extends express.Request {
    user?: RType
}

export const PRO: express.Handler = async (req: AU, res, next) => {
    let token: string;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, `${JWT}`) as DecodedToken;
            const result = await dBase.query<RType>(
                "SELECT user_id, email, FROM users WHERE id = $1",
                [decoded.user_id]
            );
            const user = result.rows[0];
            if (!user) {
                res.status(401);
                throw new Error("Not Authorized, User not Found!")
            };
            req.user = user;
            next();
        } catch (error) {
            res
                .status(res.statusCode)
                .json({                    success: false,
                    message: "Error User Profile!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    }
};




