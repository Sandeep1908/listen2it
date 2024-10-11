import { Outlet } from "react-router-dom";
import Header from "../components/Header";

 
 import { useLocation } from "react-router-dom";

function Main() {
  const location =useLocation();
   
  return (
    <div className="w-full h-screen bg-[#EEEEEE]">
      {!['/signin', '/signup'].includes(location.pathname) ? <Header /> : ''}
      <div className="">
      <Outlet/>
      </div>
    </div>
  );
}

export default Main;
