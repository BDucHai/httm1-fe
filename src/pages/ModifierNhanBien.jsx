import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Collapse, Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";

const ModifierNhanBien = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bien, setBien] = useState({
        id: "",
        nhan: "",
    });

    const [mess, setMess] = useState("");
    const [open, setOpen] = useState(true);
    const [ask, setAsk] = useState(false);

    let action = "Thêm";
    if (id !== "0") {
        action = "Sửa";
    }

    useEffect(() => {
        const getNhan = async () => {
            await axios
                .get(`https://httm1-production.up.railway.app/api/bien/getNhan/${id}`)
                .then((e) => {
                    setBien(e.data);
                })
                .catch((e) => {});
        };

        if (id !== "0") {
            getNhan();
        }
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setBien({
            ...bien,
            [e.target.name]: value,
        });
    };

    const handleAdd = async () => {
        await axios
            .post(`https://httm1-production.up.railway.app/api/bien/addNhan`, bien)
            .then((e) => {
                setMess(`${action} thành công!!`);
                setBien({
                    id: "",
                    nhan: "",
                });
                setAsk(false);
                setOpen(true);
                document.documentElement.scrollTop = 0;
            })
            .catch((e) => {
                if (e === "Not found") {
                    setMess("Hãy nhập hết các giá trị còn trống");
                }
                setOpen(true);
                setAsk(false);
                document.documentElement.scrollTop = 0;
            });
    };

    const handleUpdate = async () => {
        await axios
            .post(`https://httm1-production.up.railway.app/api/bien/updateNhan/${id}`, bien)
            .then((e) => {
                setMess(`${action} thành công!!`);
                setBien({
                    id: "",
                    nhan: "",
                });
                setAsk(false);
                setOpen(true);
                document.documentElement.scrollTop = 0;
                navigate(`/nhan/bien`);
            })
            .catch((e) => {
                if (e === "Not found") {
                    setMess("Hãy nhập hết các giá trị còn trống");
                }
                setOpen(true);
                setAsk(false);
                document.documentElement.scrollTop = 0;
            });
    };
    return (
        <div>
            <span className="block text-center w-full mt-[20px] text-[40px] font-semibold">{action} nhãn</span>

            <Link to={`/nhan/bien`}>
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
                            value={bien.id}
                            onChange={handleChange}
                            disabled
                        />
                    </div>

                    <div className="flex mt-[16px] mb-[20px] px-[30px] py-[20px]">
                        <label for="nhan" className="font-semibold w-[160px]">
                            Nhãn:
                        </label>
                        <textarea
                            id="nhan"
                            name="nhan"
                            rows="6"
                            cols="16"
                            placeholder="Nhap nhan"
                            onChange={handleChange}
                            value={bien.nhan}
                            className="w-full outline-none px-[4px] mt-2"></textarea>
                    </div>

                    {action === "Thêm" ? (
                        <>
                            <input
                                type="submit"
                                value={action}
                                className="cursor-pointer uppercase text-[20px] font-semibold px-[18px] py-[4px] bg-[#3a57b2] rounded-[8px] hover:bg-[#203988]"
                                onClick={() => setAsk(true)}
                            />
                            <Dialog
                                open={ask}
                                onClose={() => setAsk(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description">
                                <DialogTitle id="alert-dialog-title">{"Bạn có muốn thêm nhãn?"}</DialogTitle>
                                <DialogActions>
                                    <Button onClick={() => setAsk(false)}>Không</Button>
                                    <Button onClick={handleAdd} autoFocus>
                                        Đồng ý
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    ) : (
                        <>
                            <input
                                type="submit"
                                value="Save"
                                className="cursor-pointer uppercase text-[20px] font-semibold px-[18px] py-[4px] bg-[#3a57b2] rounded-[8px] hover:bg-[#203988]"
                                onClick={handleUpdate}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModifierNhanBien;
