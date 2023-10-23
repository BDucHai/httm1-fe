import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="mt-[80px] px-[200px]">
            <div className="flex gap-[40px] mt-[10px] mb-[40px] text-dark">
                <Link to="/mau/bien">
                    <div className="px-[8px] py-[4px] text-center border-[3px] border-[#0c2ad6] rounded-[4px] font-medium cursor-pointer">
                        Quản lý mẫu biển xe
                    </div>
                </Link>
                <Link to="/nhan/bien">
                    <div className="px-[8px] py-[4px] text-center border-[3px] border-[#0c2ad6] rounded-[4px] font-medium cursor-pointer">
                        Quản lý nhãn biển xe
                    </div>
                </Link>
                <Link to="/model/bien">
                    <div className="px-[8px] py-[4px] text-center border-[3px] border-[#0c2ad6] rounded-[4px] font-medium cursor-pointer">
                        Quản lý mô hình thuật toán biển xe
                    </div>
                </Link>
            </div>

            {/* DENGGIAOTHONG */}
            <div className="flex gap-[40px] mt-[10px] mb-[40px] text-dark">
                <Link to="/mauType/den">
                    <div className="px-[8px] py-[4px] text-center border-[3px] border-[#0c2ad6] rounded-[4px] font-medium cursor-pointer">
                        Quản lý mẫu đèn giao thông
                    </div>
                </Link>
                <Link to="/nhanType/den">
                    <div className="px-[8px] py-[4px] text-center border-[3px] border-[#0c2ad6] rounded-[4px] font-medium cursor-pointer">
                        Quản lý nhãn đèn giao thông
                    </div>
                </Link>
                <Link to="/modelType/den">
                    <div className="px-[8px] py-[4px] text-center border-[3px] border-[#0c2ad6] rounded-[4px] font-medium cursor-pointer">
                        Quản lý mô hình thuật toán đèn giao thông
                    </div>
                </Link>
            </div>

            {/* VACHKE */}
            <div className="flex gap-[40px] my-[10px] text-dark">
                <Link to="/mauType/vach">
                    <div className="px-[8px] py-[4px] text-center border-[3px] border-[#0c2ad6] rounded-[4px] font-medium cursor-pointer">
                        Quản lý mẫu vạch kẻ
                    </div>
                </Link>
                <Link to="/nhanType/vach">
                    <div className="px-[8px] py-[4px] text-center border-[3px] border-[#0c2ad6] rounded-[4px] font-medium cursor-pointer">
                        Quản lý nhãn vạch kẻ
                    </div>
                </Link>
                <Link to="/modelType/vach">
                    <div className="px-[8px] py-[4px] text-center border-[3px] border-[#0c2ad6] rounded-[4px] font-medium cursor-pointer">
                        Quản lý mô hình thuật toán vạch kẻ
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Home;
