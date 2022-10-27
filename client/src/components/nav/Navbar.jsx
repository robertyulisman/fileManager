import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/users/me");
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  if (!user) return null;

  return (
    <header className="bg-gradient-to-l from-cyan-500 to-blue-500  w-full shadow-xl">
      <div className="w-[95%]  m-auto flex flex-row">
        <div className="flex justify-between items-center p-1 w-full">
          <FaUserAlt className="w-[60px] h-[60px] rounded-full bg-slate-200 p-1 mr-3 text-slate-500" />
          <div className="w-full">
            <h1 className="w-full text-[24px] text-white">{user.name}</h1>
            <div className="flex items-baseline">
              <p className="text-md text-white">{user.email}</p>
              <div
                className=" w-[30px] h-[30px] text-xl  text-white flex items-center justify-center cursor-pointer hover:bg-slate-400 hover:rounded-full"
                onClick={handleEdit}
                tabIndex={0}
                role="button"
              >
                <MdEdit />
              </div>
            </div>
          </div>
        </div>
        <nav className="flex items-center">
          <button
            type="button"
            className="px-4 bg-rose-500 text-white py-2 rounded-lg hover:opacity-80 text-[18px] ml-4"
            onClick={handleLogout}
          >
            logout
          </button>
        </nav>
      </div>
    </header>
  );
}
