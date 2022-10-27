import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageLogin from "../../asset/images/login.jpg";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function Login() {
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState("password");

  const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await axios.post("/api/auth/login", {
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div className="flex w-full h-[100vh]">
      <div className="w-full h-full items-center bg-white hidden md:flex">
        <img className="w-[70%] h-auto m-auto" src={ImageLogin} alt="" />
      </div>
      {/* <div className="w-full sm:w-6/12 h-[100vh] flex items-center justify-center  bg-rose-400  "> */}
      <div className=" w-full md:w-[500px] py-8 px-4 flex flex-col items-center justify-center  shadow-lg bg-gradient-to-b from-indigo-500 to-indigo-700  ">
        <h3 className="text-[22px] md:text-[32px] font-bold text-center text-slate-200">
          LOGIN
        </h3>

        <form
          className="p-5 w-[500px] flex flex-col items-center"
          onSubmit={login}
        >
          <label class="block w-[70%]">
            <span class="block text-sm font-medium text-slate-200 mb-2">
              Email
            </span>

            <input
              className="p-2 w-full pl-4 border-slate-500 border-[1px] rounded-lg hover:border-sky-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-[18px]"
              name="email"
              type="email"
              placeholder="email"
              required
            />
          </label>
          <label class="block w-[70%] mt-4">
            <span class="block text-sm font-medium text-slate-200 mb-2">
              Password
            </span>

            <div className="w-full flex items-center  bg-white border-slate-500 border-[1px] rounded-lg hover:border-sky-500 focus-within:outline-none focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 text-[18px] overflow-hidden">
              <input
                className="w-full p-2 border-none rounded-tl-md pl-4 rounded-bl-md focus:outline-none focus:border-none focus:ring-0"
                name="password"
                type={visible}
                placeholder="password"
                required
              />
              <span
                className="text-[24px]  text-slate-800  cursor-pointer hover:opacity-80 mx-2"
                onClick={() =>
                  setVisible((prev) => (prev === "text" ? "password" : "text"))
                }
              >
                {visible === "text" ? <MdVisibility /> : <MdVisibilityOff />}
              </span>
            </div>
          </label>

          <button
            className="w-[70%] mt-8 bg-gradient-to-r from-orange-400 to-orange-500 text-white py-2 px-1 rounded-lg hover:opacity-80 text-[18px]"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
