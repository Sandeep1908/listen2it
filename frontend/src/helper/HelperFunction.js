import axiosInstance from "../axios/axiosInstance";



export const fetchCurrentUser = async () => {
    const { data } = await axiosInstance.get("/user/getcurrentuser");
    return data;
  };

  