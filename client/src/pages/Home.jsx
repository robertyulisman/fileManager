import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import {
  BsHouseDoorFill,
  BsFillArrowRightSquareFill,
  BsArrowLeftSquare,
  BsArrowRightSquare,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // state
  const [menuSelected, setMenuSelected] = React.useState("Home");
  const [showMenu, setShowMenu] = React.useState(true);

  const handleClickMenu = async (item) => {
    setMenuSelected(item.name);

    if (item.name === "Logout") {
      try {
        await axios.get("/api/auth/logout");

        toast.success("Logged out successfully");
        navigate("/auth");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const menu = [
    {
      _id: 1,
      name: "Home",
      icon: <BsHouseDoorFill />,
    },
    {
      _id: 2,
      name: "Menu 1",
      icon: <BsHouseDoorFill />,
    },
    {
      _id: 3,
      name: "Menu 2",
      icon: <BsHouseDoorFill />,
    },
    {
      _id: 4,
      name: "Logout",
      icon: <BsFillArrowRightSquareFill />,
    },
  ];
  return (
    <div className="flex flex-row">
      {/* <Navbar /> */}
      {/* sidebar */}
      <div
        className={`${
          showMenu ? "w-[220px]" : "w-[70px]"
        }  border-r-[1px] duration-200 ease-in-out all`}
      >
        {showMenu && (
          <div className="w-full h-[60px] flex items-center justify-center bg-gradient-to-r from-indigo-200 to-indigo-300">
            <h1>LOGO</h1>
          </div>
        )}

        <div className="min-h-[90vh]">
          {menu.map((item, index) => (
            <div
              onClick={() => handleClickMenu(item)}
              key={`${item._id}-menu`}
              className={`flex items-center h-[60px] px-4 hover:cursor-pointer group hover:bg-indigo-500 ${
                menuSelected === item.name
                  ? "bg-gradient-to-r from-orange-400 to-orange-500"
                  : "bg-white"
              }`}
            >
              <div
                className={` group-hover:text-slate-100  ${
                  menuSelected === item.name ? "text-white" : "text-slate-400"
                } ${
                  showMenu
                    ? "ml-0"
                    : "ml-1 text-[20px] duration-400 ease-in-out all"
                }`}
              >
                {item.icon}
              </div>
              {showMenu && (
                <div
                  className={`ml-2 group-hover:text-slate-100 ${
                    menuSelected === item.name ? "text-white" : "text-slate-700"
                  }`}
                >
                  {item.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* content */}
      <div className="flex-1 h-[100vh] bg-slate-100 overflow-scroll">
        <div className="w-full h-[60px] bg-gradient-to-r from-indigo-500 to-indigo-700 fixed flex items-center px-4">
          {/* content header */}
          {showMenu ? (
            <div onClick={() => setShowMenu(false)}>
              <BsArrowLeftSquare className="text-[24px] text-white" />
            </div>
          ) : (
            <div onClick={() => setShowMenu(true)}>
              <BsArrowRightSquare className="text-[24px] text-white" />
            </div>
          )}
        </div>
        <div className="m-4 bg-white rounded-md p-4 mt-[75px]">
          <div className="h-[1000px]"></div>
          <h1>judul</h1>
        </div>
      </div>
    </div>
  );
}
export default Home;
