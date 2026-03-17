import React from "react";
import "./Login.css";
import { LoginUser } from "../../components/login/LoginUser";

export const Login = () => {
    return (
        <React.Fragment>
            <main>
                <h1>Login Page</h1>
                <LoginUser />
            </main>
        </React.Fragment>
    );
};


