import React, { useState } from "react";
import { Icon } from "@iconify/react";
import logo from "../assets/LogoLogin.png";
import bgImage from "../assets/bgLogin.jpg";
import { Link } from "react-router-dom";

const RegisterPage = () => {
const [showPassword, setShowPassword] = useState(false);

return (
    <div
        className="bg-contain bg-center min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
    >
        <div className="w-full flex flex-col lg:flex-row justify-center items-stretch px-4 lg:px-80 min-h-screen">
            {/* Kiri */}
            <div className="w-full lg:w-1/2 hidden lg:flex flex-col justify-center text-[#39833C] text-left pr-2 mb-30">
                <img src={logo} alt="Logo" className="w-80 " />
                <div className="max-w-md pl-10 mt-[-20px]">
                    <h2 className="text-3xl font-semibold leading-tight mb-4">
                        Gizi seimbang dimulai <br />
                        dari piring hari ini
                    </h2>
                    <p className="text-base leading-relaxed">
                        Isi Piringku hadir untuk membantu keluarga Indonesia
                        memahami pentingnya gizi seimbang demi tumbuh
                        kembang anak yang optimal dan ibu yang sehat.
                    </p>
                </div>
            </div>

            {/* Kanan */}
            <div className="w-full lg:w-1/2 flex justify-center items-start">
                <div className="flex flex-col w-full max-w-md h-screen pt-24">
                    <div className="bg-[#F5F5F5] shadow-2xl rounded-2xl lg:rounded-t-2xl lg:rounded-b-none w-full flex flex-col flex-grow px-10 pt-10 pb-6">
                        <div className="flex-shrink-0">
                            <div className="text-left mb-6">
                                <h3 className="text-sm text-gray-500 mb-1">
                                    CREATE YOUR NEW ACCOUNT
                                </h3>
                                <h2 className="text-2xl font-bold">
                                    Register your Account
                                </h2>
                            </div>

                            <form className="space-y-5">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder=" "
                                        className="peer w-full px-4 pt-6 pb-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute left-4 top-2 text-sm text-gray-500 transition-all
                                        peer-placeholder-shown:top-3
                                        peer-placeholder-shown:text-base
                                      peer-placeholder-shown:text-gray-400
                                        peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500"
                                    >
                                        Full Name
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder=" "
                                        className="peer w-full px-4 pt-6 pb-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-4 top-2 text-sm text-gray-500 transition-all
                                        peer-placeholder-shown:top-3
                                        peer-placeholder-shown:text-base
                                      peer-placeholder-shown:text-gray-400
                                        peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500"
                                    >
                                        Email
                                    </label>
                                    <Icon
                                        icon="mdi:email-outline"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        width={20}
                                        height={20}
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        id="password"
                                        placeholder=" "
                                        className="peer w-full px-4 pt-6 pb-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                    />
                                    <label
                                        htmlFor="password"
                                        className="absolute left-4 top-2 text-sm text-gray-500 transition-all
                                        peer-placeholder-shown:top-3
                                        peer-placeholder-shown:text-base
                                      peer-placeholder-shown:text-gray-400
                                        peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500"
                                                        >
                                        Password
                                    </label>
                                    <Icon
                                        icon={
                                            showPassword
                                                ? "mdi:eye-off-outline"
                                                : "mdi:eye-outline"
                                        }
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                        width={20}
                                        height={20}
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#C8E6C9] hover:bg-[#4CAF50] text-white font-semibold py-2 rounded-md transition duration-200"
                                >
                                    SIGN UP
                                </button>
                            </form>

                            <div className="mt-6 text-sm text-center">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-black font-semibold hover:underline"
                                >
                                    LOG IN HERE
                                </Link>
                            </div>
                        </div>
                        <div className="flex-grow"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default RegisterPage;
