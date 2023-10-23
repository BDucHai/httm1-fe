import React from "react";
import ModelType from "../components/ModelType";
import { useParams } from "react-router-dom";

const ModelDenVach = () => {
    const { type } = useParams();
    return (
        <div>
            <ModelType type={type} />
        </div>
    );
};

export default ModelDenVach;
