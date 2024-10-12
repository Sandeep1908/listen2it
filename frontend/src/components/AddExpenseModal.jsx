import { useEffect, useState } from "react";
import CloseIco from "../assets/Logo/close.png";
import { items } from "../config/categories";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";

//Add Expense modal to add new Expense
function AddExpenseModal({ isOpenModal, setIsOpenModal }) {
  const queryClient= useQueryClient();
  const categories = items?.map((i) => i.category);


  const [subCategories, setSubCategories] = useState([]);

  const [spendOn, setSpendOn] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");

  useEffect(() => {
    const subcategoriesItems =
      items?.find((i) => i.category === category)?.subcategories || [];
    setSubCategories(subcategoriesItems);
  }, [category]);


  const mutation = useMutation({
    mutationFn: async (expenseData) => {
      const response = await axiosInstance.post(
        "/expense/add-expense",
        expenseData
      );
      return response.data;
    },
    onSuccess: () => {
      alert("Expense add successfully");
      queryClient.invalidateQueries('expenses')
      setIsOpenModal(false);
    },
    onError: (error) => {
      console.error("Sign in failed", error);
      alert("Something Error In Add Expense");
    },
  });

  // Add Expense handler
  const addExpense = (e) => {
    e.preventDefault();
    if (!spendOn || !amount || !category || !subcategory) {
      alert("Please fill all fields.");
      return;
    }
    mutation.mutate({ spendOn, amount, category, subcategory });
  };

  return (
    <div
      className={`w-full h-full flex p-3   justify-center items-center  fixed inset-0 transition-all duration-500  ${
        isOpenModal ? "opacity-1 scale-[1.01] z-[10]" : "opacity-0 z-[-100]"
      }    `}
    >
      <div className="w-full h-screen hidden md:block absolute opacity-[.7] after:absolute   after:w-full after:h-full after:bg-black "></div>

      <div className="max-w-80 rounded-md p-3 w-full bg-white z-10">
        <div className="flex justify-end items-center">
          <img
            src={CloseIco}
            onClick={() => setIsOpenModal(false)}
            className="cursor-pointer"
            alt=""
          />
        </div>

        <h1 className="font-[500] text-lg">New Expense</h1>

        <div className="mt-4 flex flex-col space-y-2">
          <div className="flex flex-col space-y-1">
            <label htmlFor="" className="text-xs font-[500] text-[#606060]">
              What did you spend on?
            </label>
            <input
              type="text"
              className="w-full p-2 text-xs border rounded-md placeholder:text-[10px]  "
              onChange={(e) => setSpendOn(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="" className="text-xs text-[#606060] font-[500]">
              Amount
            </label>
            <input
              type="number"
              className="w-full text-xs p-2 border rounded-md"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="" className="text-xs text-[#606060] font-[500]">
              Category
            </label>
            <select
              className="w-full p-2 text-xs border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories?.map((item, i) => (
                <option value={item} key={i}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="" className="text-xs text-[#606060] font-[500]">
              Sub-category
            </label>
            <select
              className="w-full p-2 text-xs border rounded-md"
              onChange={(e) => setSubCategory(e.target.value)}
            >
              {subCategories.length > 0 ? (
                <option value="">Select a subcategory</option>
              ) : (
                <option value="">Select a category first</option>
              )}

              {subCategories?.map((sub, i) => (
                <option defaultChecked key={i} value={sub?.name}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full pt-5">
            <p
              onClick={addExpense}
              className="w-full cursor-pointer p-2 bg-[#015FE4] text-white text-center rounded-md"
            >
              Add
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExpenseModal;
