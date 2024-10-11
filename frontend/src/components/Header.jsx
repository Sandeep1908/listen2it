import Logo from "../assets/Logo/logo.png";
import Avatar from "../assets/Avatar/group.png";


import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
 

import { fetchCurrentUser } from "../helper/HelperFunction";



function Header() {
  const navigate = useNavigate();
  const { data: currentUser } = useQuery({
    queryKey: ["currentuser"],
    queryFn: fetchCurrentUser,
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/signin");
  };

  return (
    <div className="w-full">
      <div className=" max-w-7xl m-auto flex justify-between items-center py-4 ">
        <img src={Logo} alt="" />
        <div className="flex space-x-2 items-center">
          <img
            src={Avatar}
            alt=""
            className="cursor-pointer"
            onClick={handleLogout}
          />
          <p className="text-xs">{currentUser?.message?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
