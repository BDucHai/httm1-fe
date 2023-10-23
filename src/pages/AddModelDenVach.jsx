import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Collapse, Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";

const AddModelDenVach = () => {
    const { type } = useParams();
    const [model, setModel] = useState({
        _id: "",
        name: "",
        path: "",
        time: "",
        acc: "",
        pre: "",
        recall: "",
        f1: "",
    });

    const [mess, setMess] = useState("");
    const [open, setOpen] = useState(true);
    const [ask, setAsk] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setModel({
            ...model,
            [e.target.name]: value,
        });
    };

    const handleAdd = async () => {
        await axios
            .post(`https://ptht.onrender.com/api/${type}/qlmodel`, model)
            .then((e) => {
                setMess(`Thêm thành công!!`);
                setModel({
                    id: "",
                    name: "",
                    path: "",
                    time: "",
                    acc: "",
                    pre: "",
                    recall: "",
                    f1: "",
                });
                setAsk(false);
                setOpen(true);
                document.documentElement.scrollTop = 0;
            })
            .catch((e) => {
                if (e.response.data === "Not found") {
                    setMess("Hãy nhập hết các giá trị còn trống");
                }
                setOpen(true);
                setAsk(false);
                document.documentElement.scrollTop = 0;
            });
    };

    return (
        <div>
            <span className="block text-center w-full mt-[20px] pb-[24px] text-[40px] font-semibold">Thêm model</span>
            <Link to={`/modelType/${type}`}>
                <div className="px-[20px] py-[4px] border-2 border-[#000] inline-block mr-[900px] mb-[10px]">Back</div>
            </Link>
            {mess !== "" && (
                <Collapse in={open} className="mb-[8px]">
                    <Alert
                        severity="info"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}>
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{
                            mb: "8px",
                            backgroundColor: "#312727",
                            width: "40%",
                            margin: "0 auto",
                            color: "#fff",
                        }}>
                        {mess}
                    </Alert>
                </Collapse>
            )}
            <div className="flex justify-center">
                <div className="w-[600px] bg-[#435b6ab0] pb-[20px] rounded-[4px]">
                    <div className="flex justify-center items-center  px-[30px] py-[20px]">
                        <label for="id" className="font-semibold w-[160px]">
                            Id:
                        </label>
                        <input
                            type="text"
                            name="id"
                            id="id"
                            className="w-full px-[5px] py-[3px] outline-none mt-2 ml-[20px]"
                            placeholder=""
                            value={model.id}
                            onChange={handleChange}
                            disabled
                        />
                    </div>

                    <div className="flex justify-center items-center  px-[30px] py-[20px]">
                        <label for="id" className="font-semibold w-[160px]">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full px-[5px] py-[3px] outline-none mt-2 ml-[20px]"
                            placeholder=""
                            value={model.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-center items-center  px-[30px] py-[20px]">
                        <label for="id" className="font-semibold w-[160px]">
                            Path:
                        </label>
                        <input
                            type="text"
                            name="path"
                            id="path"
                            className="w-full px-[5px] py-[3px] outline-none mt-2 ml-[20px]"
                            placeholder=""
                            value={model.path}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-center items-center  px-[30px] py-[20px]">
                        <label for="id" className="font-semibold w-[160px]">
                            Time:
                        </label>
                        <input
                            type="text"
                            name="time"
                            id="time"
                            className="w-full px-[5px] py-[3px] outline-none mt-2 ml-[20px]"
                            placeholder=""
                            value={model.time}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-center items-center  px-[30px] py-[20px]">
                        <label for="id" className="font-semibold w-[160px]">
                            Accurate:
                        </label>
                        <input
                            type="text"
                            name="acc"
                            id="acc"
                            className="w-full px-[5px] py-[3px] outline-none mt-2 ml-[20px]"
                            placeholder=""
                            value={model.acc}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-center items-center  px-[30px] py-[20px]">
                        <label for="id" className="font-semibold w-[160px]">
                            Precision:
                        </label>
                        <input
                            type="text"
                            name="pre"
                            id="pre"
                            className="w-full px-[5px] py-[3px] outline-none mt-2 ml-[20px]"
                            placeholder=""
                            value={model.pre}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-center items-center  px-[30px] py-[20px]">
                        <label for="id" className="font-semibold w-[160px]">
                            Recall:
                        </label>
                        <input
                            type="text"
                            name="recall"
                            id="recall"
                            className="w-full px-[5px] py-[3px] outline-none mt-2 ml-[20px]"
                            placeholder=""
                            value={model.recall}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-center items-center  px-[30px] py-[20px]">
                        <label for="id" className="font-semibold w-[160px]">
                            F1_score:
                        </label>
                        <input
                            type="text"
                            name="f1"
                            id="f1"
                            className="w-full px-[5px] py-[3px] outline-none mt-2 ml-[20px]"
                            placeholder=""
                            value={model.f1}
                            onChange={handleChange}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Thêm"
                        className="cursor-pointer uppercase text-[20px] font-semibold px-[18px] py-[4px] bg-[#3a57b2] rounded-[8px] hover:bg-[#203988]"
                        onClick={() => setAsk(true)}
                    />
                    <Dialog
                        open={ask}
                        onClose={() => setAsk(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Bạn có muốn thêm model?"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={() => setAsk(false)}>Không</Button>
                            <Button onClick={handleAdd} autoFocus>
                                Đồng ý
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default AddModelDenVach;
