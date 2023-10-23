import { Home } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className="flex justify-between bg-[#000] px-[140px]">
            <Link to="/">
                <div className=" text-white px-[40px] py-[14px] text-center font-semibold text-[20px]">
                    Nhóm 10
                </div>
            </Link>
            <Link to="/">
                <div className=" text-white px-[40px] py-[14px] text-center font-semibold">
                    <Home fontSize="medium"/>
                </div>
            </Link>
        </div>
    );
};

export default Nav;
