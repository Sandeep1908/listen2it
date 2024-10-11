import WeeklyStats from "../components/WeeklyStats";
import MontlyStats from "../components/MontlyStats";
import Transaction from "../components/Transaction";
import plusLogo from '../assets/Logo/plus.png'
import { useState } from "react";
import AddExpenseModal from "../components/AddExpenseModal";


function Home() {
  const [isOpenModal,setIsOpenModal]=useState(false)

  return (
    <div className="w-full h-[calc(100vh-100px)] max-w-5xl m-auto  p-3 flex space-x-6" >
      <div className="max-w-[70%] w-full h-full  flex flex-col space-y-1 justify-between items-center  ">
        <div className="w-full h-[30vh p-2]">
          <MontlyStats />
        </div>

        <div className="w-full h-[45vh]  ">
          <WeeklyStats />
        </div>
      </div>

      <div className="flex-1  ">
        <Transaction />

        <div className="flex justify-end items-center mt-3 cursor-pointer">
        <div className="w-7 h-7 flex justify-center items-center bg-[#015FE4] rounded-full" onClick={()=>setIsOpenModal(true)}><img className="w-4" src={plusLogo} alt="" /></div>
        </div>
       
      </div>


      <AddExpenseModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}/>



     
    </div>
  );
}

export default Home;
