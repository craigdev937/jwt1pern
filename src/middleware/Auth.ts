import express from "express";
import jwt from "jsonwebtoken";
const JWT = process.env.JWT_SECRET ?? "";

export const signToken = (user_id: string) => jwt.sign({ user_id }, 
        `${JWT}`, { expiresIn: "1d" }
    );

function parseJwt(token: string) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64")
        .toString());
}

export const authToken: express.Handler = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res
        .sendStatus(401)
        .json({ msg: "Auth Denied!" });

    jwt.verify(token,
        `${JWT}`, (err) => {
            if (err) return res.sendStatus(403);
            req.body.user = parseJwt(token).email;
            next();
        });
};



