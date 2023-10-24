import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";

const ModelType = ({ type }) => {
    const [model, setModel] = useState([]);
    const [state, setState] = useState();
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);

    const [searchValue, setSearchValue] = useState("");
    const [modelShow, setModelShow] = useState([]);

    let name;
    const handleName = () => {
        if (type === "den") {
            name = "đèn giao thông";
        } else {
            name = "vạch kẻ";
        }
    };
    handleName();

    const handleDelete = async (id) => {
        await axios.delete(`https://ptht.onrender.com/api/${type}/qlmodel/${id}`);
        setOpen(false);
        setUpdate(true);
    };

    const handleFind = () => {
        setModelShow(
            model.filter((m) => {
                return m.name.includes(searchValue);
            })
        );
    };

    useEffect(() => {
        const fetchModel = async () => {
            await axios
                .get(`https://ptht.onrender.com/api/model/`)
                .then((e) => {
                    setModel(e.data.data);
                    setModelShow(e.data.data);
                })
                .catch((e) => {});
        };
        fetchModel();
        return () => {
            setUpdate(false);
        };
    }, [update]);

    return (
        <div className="mt-[40px]">
            <p className="text-[30px] font-bold mb-[40px]">Quản lý model {name}</p>
            <div className="flex justify-between px-[140px] mb-[40px]">
                <div className="flex">
                    <Link to={`/addModelType/${type}`}>
                        <div className="px-[6px] py-[3px] text-center border-2 border-[#0c2ad6] rounded-[4px] cursor-pointer">
                            Thêm mới
                        </div>
                    </Link>
                    <div className="ml-[50px] px-[6px] py-[3px] text-center border-2 border-[#0c2ad6] rounded-[4px] cursor-pointer">
                        Retrain
                    </div>
                </div>
                <div className="flex">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="px-[3px] py-[4px] w-[200px] border-[#000] border-2 rounded-[4px]"
                    />
                    <div
                        className="px-[10px] py-[3px] border-2 border-[#0c2ad6] rounded-[4px] cursor-pointer ml-[4px]"
                        onClick={handleFind}>
                        Search
                    </div>
                </div>
            </div>

            <TableContainer component={Paper} style={{ paddingLeft: "60px", paddingRight: "60px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                Name
                            </TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                Path
                            </TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                Time
                            </TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                Accurate
                            </TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                Precision
                            </TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                Recall
                            </TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                F1_scrore
                            </TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                Active
                            </TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {modelShow.length !== 0 &&
                            modelShow.map((row) => (
                                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row._id}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right" style={{ textAlign: "left" }}>
                                        {row.path}
                                    </TableCell>
                                    <TableCell align="right" style={{ textAlign: "left" }}>
                                        {row.time}
                                    </TableCell>
                                    <TableCell align="right" style={{ textAlign: "left" }}>
                                        {row.acc}
                                    </TableCell>
                                    <TableCell align="right" style={{ textAlign: "left" }}>
                                        {row.pre}
                                    </TableCell>
                                    <TableCell align="right" style={{ textAlign: "left" }}>
                                        {row.recall}
                                    </TableCell>
                                    <TableCell align="right" style={{ textAlign: "left" }}>
                                        {row.f1}
                                    </TableCell>
                                    <TableCell align="right" style={{ textAlign: "left" }}>
                                        <Switch checked={row.active} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <div
                                            className="py-[3px] text-center border-2 border-[red] rounded-[4px] cursor-pointer"
                                            onClick={() => {
                                                setOpen(true);
                                                setState(row._id);
                                            }}>
                                            Xóa
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Bạn có muốn xóa?"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)}>Không</Button>
                            <Button onClick={() => handleDelete(state)} autoFocus>
                                Đồng ý
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ModelType;
