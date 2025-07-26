import React, { useState } from "react";
import { Icon } from "@iconify/react";
import logo from "../assets/LogoLogin.png";
import bgImage from "../assets/bgLogin.jpg";
import { Link } from "react-router-dom";


const LoginPage = () => {
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
                        {/* FORM  */}
                        <div className="flex-shrink-0">
                            <div className="text-left mb-6">
                                <h3 className="text-sm text-gray-500 mb-1">
                                    WELCOME BACK
                                </h3>
                                <h2 className="text-2xl font-bold">
                                    Log In to your Account
                                </h2>
                            </div>

                            <form className="space-y-5">
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder=" "
                                        className="peer w-full px-3 pt-5 pb-2 pr-10 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-3 text-gray-500 text-sm transition-all
                                        peer-placeholder-shown:text-base
                                        peer-placeholder-shown:text-gray-400
                                        peer-placeholder-shown:top-[14px]
                                        peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-500"
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

                                {/* Password Field */}
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        id="password"
                                        placeholder=" "
                                        className="peer w-full px-3 pt-5 pb-2 pr-10 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                    />
                                    <label
                                        htmlFor="password"
                                        className="absolute left-3 text-gray-500 text-sm transition-all
                                        peer-placeholder-shown:text-base
                                      peer-placeholder-shown:text-gray-400
                                        peer-placeholder-shown:top-[14px]
                                        peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-500"
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

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2 accent-green-600"
                                        />
                                        Remember me
                                    </label>
                                    <a
                                        href="#"
                                        className="text-black hover:underline"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#C8E6C9] hover:bg-[#4CAF50] text-white font-semibold py-2 rounded-md transition duration-200"
                                >
                                    CONTINUE
                                </button>
                            </form>

                            {/* FOOTER */}
                            <div className="mt-6 space-y-2 pb-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex-grow h-px bg-black/30"></div>
                                    <span className="text-black font-bold text-sm">
                                        Or
                                    </span>
                                    <div className="flex-grow h-px bg-black/30"></div>
                                </div>
                                <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 text-sm font-medium">
                                    <Icon
                                        icon="flat-color-icons:google"
                                        className="w-5 h-5 mr-2"
                                    />
                                    Log in with Google
                                </button>
                                <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 text-sm font-medium">
                                    <Icon
                                        icon="logos:facebook"
                                        className="w-5 h-5 mr-2"
                                    />
                                    Log in with Facebook
                                </button>
                                <p className="text-sm text-center mt-4">
                                    New User?{" "}
                                    <Link
                                        to="/register"
                                        className="text-black font-semibold hover:underline"
                                    >
                                        SIGN UP HERE
                                    </Link>
                                </p>
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

export default LoginPage;
