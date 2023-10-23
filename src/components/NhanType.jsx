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
import { Link } from "react-router-dom";

// function createData(id, nhan) {
//     return { id, nhan };
// }
// const rows = [createData(1, "60A99999"), createData(2, "73A14953")];

const NhanType = ({ type }) => {
    const [nhan, setNhan] = useState([]);
    const [state, setState] = useState();
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
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
        await axios.delete(`https://ptht.onrender.com/api/${type}/qlnhan/${id}`);

        setOpen(false);
        setUpdate(true);
    };

    useEffect(() => {
        const fetchNhan = async () => {
            await axios
                .get(`https://ptht.onrender.com/api/${type}/qlnhan`)
                .then((e) => {
                    setNhan(e.data.data);
                })
                .catch((e) => {});
        };

        fetchNhan();
        return () => {
            setUpdate(false);
        };
    }, [update]);

    return (
        <div className="mt-[40px]">
            <p className="text-[30px] font-bold mb-[40px]">Quản lý nhãn {name}</p>
            <div className="flex justify-between px-[140px] mb-[40px]">
                <Link to={`/modifier/nhan${type}/0`}>
                    <div className="px-[6px] py-[3px] text-center border-2 border-[#0c2ad6] rounded-[4px] cursor-pointer">
                        Thêm mới
                    </div>
                </Link>
                <div className="flex">
                    <input type="text" className="px-[3px] py-[4px] w-[200px] border-[#000] border-2 rounded-[4px]" />
                    <div className="px-[10px] py-[3px] border-2 border-[#0c2ad6] rounded-[4px] cursor-pointer ml-[4px]">
                        Search
                    </div>
                </div>
            </div>

            <TableContainer component={Paper} style={{ paddingLeft: "60px", paddingRight: "60px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {type === "den" ? <TableCell>Đèn đỏ</TableCell> : <TableCell>Vạch kẻ</TableCell>}
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                Tọa độ X
                            </TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                Tọa độ Y
                            </TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                Width
                            </TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                Height
                            </TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                idMau
                            </TableCell>
                            <TableCell align="right" style={{ textAlign: "left" }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nhan.length !== 0 &&
                            nhan.map((row) => (
                                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    {type === "den" ? (
                                        <TableCell component="th" scope="row">
                                            {row.dendo ? "có" : "không"}
                                        </TableCell>
                                    ) : (
                                        <TableCell component="th" scope="row">
                                            {row.vach ? "có" : "không"}
                                        </TableCell>
                                    )}
                                    <TableCell align="right" style={{ textAlign: "left" }}>
                                        {row.toadoX}
                                    </TableCell>
                                    <TableCell align="right" style={{ textAlign: "left" }}>
                                        {row.toadoY}
                                    </TableCell>
                                    <TableCell align="right" style={{ textAlign: "left" }}>
                                        {row.width}
                                    </TableCell>
                                    <TableCell align="right" style={{ textAlign: "left" }}>
                                        {row.height}
                                    </TableCell>
                                    <TableCell align="right" style={{ textAlign: "left" }}>
                                        {row.idMau}
                                    </TableCell>
                                    <TableCell align="right" style={{ width: "120px" }}>
                                        <Link to={`/modifier/nhan${type}/${row._id}`}>
                                            <div className="py-[3px] text-center border-2 border-[#0c2ad6] rounded-[4px] cursor-pointer mb-[6px]">
                                                Sửa
                                            </div>
                                        </Link>
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

export default NhanType;
