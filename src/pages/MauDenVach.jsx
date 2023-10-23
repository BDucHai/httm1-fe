import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import MauType from "../components/MauType";

const MauDenVach = () => {
    const { type } = useParams();

    return (
        <div>
            <MauType type={type} />
        </div>
    );
};

export default MauDenVach;
