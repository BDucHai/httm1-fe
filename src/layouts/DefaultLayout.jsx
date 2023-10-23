import React from "react";
import Nav from "../components/Nav";

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Nav />
            <div>{children}</div>
        </div>
    );
};

export default DefaultLayout;
