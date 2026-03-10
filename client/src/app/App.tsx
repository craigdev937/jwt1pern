import React from "react";
import "./App.css";
import { NavRoutes } from "../routes/NavRoutes";
import { Footer } from "../components/foot/Footer";

export const App = () => {
    return (
        <React.Fragment>
            <NavRoutes />
            <Footer />
        </React.Fragment>
    );
};



