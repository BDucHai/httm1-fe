import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Collapse, Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";

const ModifierMauBien = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mau, setMau] = useState({
        id: "",
        url: "",
        description: "",
    });

    const [mess, setMess] = useState("");
    const [open, setOpen] = useState(true);
    const [ask, setAsk] = useState(false);

    let action = "Thêm";
    if (id !== "0") {
        action = "Sửa";
    }
    useEffect(() => {
        const getMau = async () => {
            await axios.get(`https://httm1-production.up.railway.app/api/bien/getMau/${id}`).then((e) => {
                setMau(e.data);
            });
        };

        if (id !== "0") {
            getMau();
        }
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setMau({
            ...mau,
            [e.target.name]: value,
        });
    };

    const handleAdd = async () => {
        await axios({
            method: "post",
            url: `https://httm1-production.up.railway.app/api/bien/addMau`,
            data: {
                file: mau.url,
                description: mau.description,
            },
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((e) => {
                setMess(`${action} thành công!!`);
                setMau({
                    id: "",
                    url: "",
                    description: "",
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

    const handleUpdate = async () => {
        await axios({
            method: "post",
            url: `https://httm1-production.up.railway.app/api/bien/updateMau/${id}`,
            data: {
                file: mau.url,
                description: mau.description,
            },
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((e) => {
                setMess(`${action} thành công!!`);
                setMau({
                    id: "",
                    url: "",
                    description: "",
                });
                setAsk(false);
                setOpen(true);
                document.documentElement.scrollTop = 0;
                navigate(`/mau/bien`);
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
            <span className="block text-center w-full mt-[20px] pb-[24px] text-[40px] font-semibold">
                {action} mẫu biển
            </span>
            <Link to={`/mau/bien`}>
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
                            value={mau.id}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="px-[30px] py-[20px]">
                        <div className="flex">
                            <label className="font-semibold w-[120px]">Url:</label>
                            <input
                                type="file"
                                onChange={(e) => setMau((prev) => ({ ...prev, url: e.target.files[0] }))}
                                multiple
                                className="cursor-pointer mb-[10px]"
                            />
                        </div>
                        <br />
                        {mau.url && (
                            <div className="flex justify-center">
                                <img
                                    src={mau.url === Object(mau.url) ? URL.createObjectURL(mau.url) : mau.url}
                                    alt="IMG preview"
                                    className="w-[300px] h-[200px]"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex mt-[16px] mb-[20px] px-[30px] py-[20px]">
                        <label for="description" className="font-semibold w-[160px]">
                            Description:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="6"
                            cols="16"
                            placeholder="Nhập mô tả sách"
                            onChange={handleChange}
                            value={mau.description}
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
                                <DialogTitle id="alert-dialog-title">{"Bạn có muốn thêm mẫu?"}</DialogTitle>
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

export default ModifierMauBien;
