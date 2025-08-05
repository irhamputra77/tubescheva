import React, { useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import logo from "../assets/LogoLogin.png";
import bgImage from "../assets/bgLogin.jpg";
import { Link } from "react-router-dom";

const RegisterPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [gender, setGender] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [message, setMessage] = useState("");

	const isFormComplete =
		fullname &&
		email &&
		newPassword &&
		confirmNewPassword &&
		gender &&
		birthDate;

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				"https://m9n3cxf2-8000.asse.devtunnels.ms/v1/auth/signup",
				{
					fullname,
					email,
					newPassword,
					confirmNewPassword,
					gender,
				}
			);
			console.log("Register berhasil:", res.data);
			setMessage("Register berhasil!");
		} catch (error) {
			console.error("Register gagal:", error);
			setMessage("Register gagal. Silakan cek kembali data Anda.");
		}
	};

return (
    <div
        className="bg-contain bg-center min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
    >
        <div className="w-full flex flex-col lg:flex-row justify-center items-stretch gap-6 px-4 md:px-10 lg:px-40 xl:px-80 py-6 lg:py-0">
            {/* Kiri */}
            <div className="w-full lg:w-1/2 hidden lg:flex flex-col justify-center text-[#39833C] pr-2 mb-30">
                <img src={logo} alt="Logo" className="lg:w-70 xl:w-80 " />
                <div className="max-w-md pl-10 mt-[-20px]">
                    <h2 className="lg:text-2xl xl:text-3xl font-semibold leading-tight mb-4">
                        Gizi seimbang dimulai <br />
                        dari piring hari ini
                    </h2>
                    <p className=" lg:text-sm xl:text-md leading-relaxed">
                        Isi Piringku hadir untuk membantu keluarga Indonesia
                        memahami pentingnya gizi seimbang demi tumbuh
                        kembang anak yang optimal dan ibu yang sehat.
                    </p>
                </div>
            </div>

            {/* Kanan */}
            <div className="w-full lg:w-1/2 flex justify-center items-start">
                <div className="flex flex-col w-full max-w-md h-full min-h-screen pt-16 lg:min-h-[80vh] lg:pt-24 sm:px-6 md:px-10 lg:px-0 overflow-y-auto">
                    <div className="bg-[#F5F5F5] shadow-2xl rounded-2xl xl:rounded-t-2xl xl:rounded-b-none w-full flex flex-col flex-grow px-10 pt-10 pb-6">
                        <div className="mb-6">
                            <h3 className="text-sm text-gray-500 mb-1">
                                CREATE YOUR NEW ACCOUNT
                            </h3>
                            <h2 className="text-2xl font-bold">
                                Register your Account
                            </h2>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder=" "
                                    className="peer w-full px-4 pt-6 pb-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-4 top-2 text-sm text-gray-500 transition-all
                                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
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
                                    value={email}
                                    onChange={(e) =>setEmail(e.target.value)}
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-4 top-2 text-sm text-gray-500 transition-all
                                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
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
                                        showPassword ? "text" : "password"
                                    }
                                    id="newPassword"
                                    placeholder=" "
                                    className="peer w-full px-4 pt-6 pb-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                    value={newPassword}
                                    onChange={(e) =>setNewPassword(e.target.value)}
                                />
                                <label
                                    htmlFor="newPassword"
                                    className="absolute left-4 top-2 text-sm text-gray-500 transition-all
                                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                    peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500"
                                >
                                    New Password
                                </label>
                                <Icon
                                    icon={showPassword? "mdi:eye-off-outline": "mdi:eye-outline"}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                    width={20}
                                    height={20}
                                    onClick={() =>setShowPassword(!showPassword)}
                                />
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder=" "
                                    className="peer w-full px-4 pt-6 pb-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                    value={confirmNewPassword}
                                    onChange={(e) =>setConfirmNewPassword(e.target.value)}
                                />
                                <label
                                    htmlFor="confirmPassword"
                                    className="absolute left-4 top-2 text-sm text-gray-500 transition-all
                                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                    peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500"
                                >
                                    Confirm Password
                                </label>
                            </div>

                            <div className="relative">
                                <select
                                    id="gender"
                                    value={gender}
                                    onChange={(e) =>setGender(e.target.value)}
                                    className="peer w-full px-4 py-4 text-md bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="f">Female</option>
                                    <option value="m">Male</option>
                                </select>
                            </div>

                            <div className="relative">
                                <input
                                    type="date"
                                    id="birthDate"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                    value={birthDate}
                                    onChange={(e) =>setBirthDate(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className={`w-full ${
                                    isFormComplete
                                        ? "bg-[#4CAF50] active:scale-[0.98]"
                                        : "bg-[#C8E6C9]"
                                } text-white font-semibold py-2 rounded-md transition duration-200`}
                                disabled={!isFormComplete}
                            >
                                SIGN UP
                            </button>

                            {message && (
                                <p className="text-sm text-center mt-2 text-red-500">
                                    {message}
                                </p>
                            )}
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
                    <div className="flex-grow" />
                </div>
            </div>
        </div>
    </div>
);
};

export default RegisterPage;
