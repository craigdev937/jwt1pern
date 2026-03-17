import React from "react";
import "./Login.css";
import { LoginForm } from "../../components/login/LoginForm";

export const Login = () => {
    return (
        <React.Fragment>
            <main>
                <h1>Login Page</h1>
                <LoginForm />
            </main>
        </React.Fragment>
    );
};


