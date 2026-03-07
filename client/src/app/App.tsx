import React from "react";
import "./App.css";
import Bear from "@public/Werebear.jpg";

export const App = () => {
    return (
        <React.Fragment>
            <h1>Were Bear</h1>
            <img 
                src={Bear} alt="Were Bear" 
                height={"600px"} width={"auto"}
            />
        </React.Fragment>
    );
};



