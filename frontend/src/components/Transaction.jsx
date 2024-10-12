import { useState } from "react";
import { items } from "../config/categories";
import axiosInstance from "../axios/axiosInstance";

import { useQuery } from "@tanstack/react-query";



//util function to fetch all expenses category and subcategory wise

const fetchExpenses = async (categoryId, subcategoryId) => {
  const response = await axiosInstance.get("/expense/get-expenses", {
    params: {
      category: categoryId === "all" ? undefined : categoryId,
      subcategory: subcategoryId || undefined,
    },
  });

  return response?.data?.message;
};


//Transaction Component

function Transaction() {
  const [categoryId, setCategoryId] = useState("all");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const { data: expenses, isLoading } = useQuery({
    queryKey: ["expenses", categoryName, subCategoryName],
    queryFn: () => fetchExpenses(categoryName, subCategoryName),
  });

  return (
    <div className="w-full h-full bg-white shadow-xl rounded-lg">
      <div className="w-full flex justify-between items-center p-2">
        <h1 className="text-lg font-semibold">Transactions</h1>
        <div className="text-xs ">
          <select
            name=""
            id=""
            className="w-20 border p-1 outline-none border-[#015FE4] rounded-md font-semibold"
            onChange={(e) => {
              const selectedCategoryIndex = items.findIndex(
                (item) => item.category === e.target.value
              );
              setCategoryId(selectedCategoryIndex);
              setCategoryName(e.target.value);
            }}
          >
            <option value="all">All</option>
            {items?.map((item, i) => (
              <option key={i} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full max-w-72 overflow-x-scroll p-2 scrollbar">
        <div className="flex space-x-4">
          {items.map((item, i) => {
            if (categoryId === i) {
              return item?.subcategories?.map((subcategory, id) => (
                <div
                  key={id}
                  onClick={() => setSubCategoryName(subcategory.name)}
                  className="min-w-fit flex  font-[400] cursor-pointer border border-[#015fe4] px-2 text-[#707070] text-[10px] h-[25px]  shadow rounded-lg items-center justify-center "
                >
                  {subcategory.name}
                </div>
              ));
            } else {
              return null;
            }
          })}
        </div>
      </div>

      {isLoading ? (
        <p className="flex justify-center items-center h-full w-full">
          No Record Found
        </p>
      ) : (
        <div className="p-3  h-[80vh] overflow-auto">
           <h2 className="text-lg font-semibold">Today</h2>

          {expenses?.Today.map((expense) => (
            <div
              key={expense._id}
              className="flex justify-between items-start space-y-3"
            >
              {items?.map((i) =>
                i.subcategories?.map((sub, idx) => {
                  if (sub.name === expense?.subcategory) {
                    return (
                      <p key={idx} className="  text-3xl">
                        {sub.icon}
                      </p>
                    );
                  }
                  return null;
                })
              )}

              <div className="w-full flex flex-col justify-center items-center">
                <p className="text-sm w-full text-center   font-[500]">{expense?.spendOn}</p>
                <p className="text-[10px] text-center w-full text-[#707070]">{expense?.subcategory}</p>
              </div>

              <p className="  flex justify-end text-xs text-[#707070] w-full max-w-20 ">
                <span className="flex">-₹</span>{expense?.amount}
              </p>
            </div>
          ))}



          {
            expenses?.Yesterday.length>0 &&  <h2 className="text-lg font-semibold">Yesterday</h2>
          }
         

         {expenses?.Yesterday?.map((expense) => (
            <div
              key={expense._id}
              className="flex justify-between items-start space-y-3"
            >
              {items?.map((i) =>
                i.subcategories?.map((sub, idx) => {
                  if (sub.name === expense.subcategory) {
                    return (
                      <p key={idx} className="  text-3xl">
                        {sub.icon}
                      </p>
                    );
                  }
                  return null;
                })
              )}

              <div className="w-full flex flex-col justify-center items-center">
                <p className="text-sm w-full text-center   font-[500]">{expense?.spendOn}</p>
                <p className="text-[10px] text-center w-full text-[#707070]">{expense?.subcategory}</p>
              </div>

              <p className="  flex justify-end text-xs text-[#707070] w-full max-w-20">
                <span>-₹</span>{expense?.amount}
              </p>
            </div>
          ))}


{
            expenses?.Earlier.length>0 &&     <h2 className="text-lg font-semibold">Earlier</h2>
          }
         
       

         {expenses?.Earlier?.map((expense) => (
            <div
              key={expense._id}
              className="flex justify-between items-start space-y-3"
            >
              {items?.map((i) =>
                i.subcategories?.map((sub, idx) => {
                  if (sub.name === expense.subcategory) {
                    return (
                      <p key={idx} className="  text-3xl">
                        {sub.icon}
                      </p>
                    );
                  }
                  return null;
                })
              )}

              <div className="w-full flex flex-col justify-center items-center">
                <p className="text-sm w-full text-center   font-[500]">{expense?.spendOn}</p>
                <p className="text-[10px] text-center w-full text-[#707070]">{expense?.subcategory}</p>
              </div>

              <p className="  flex justify-end text-xs text-[#707070] w-full max-w-20 ">
                <span>-₹</span>{expense?.amount}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Transaction;
