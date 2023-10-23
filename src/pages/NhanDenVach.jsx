import React from "react";
import NhanType from "../components/NhanType";
import { useParams } from "react-router-dom";

const NhanDenVach = () => {
    const { type } = useParams();
    return (
        <div>
            <NhanType type={type} />
        </div>
    );
};

export default NhanDenVach;
