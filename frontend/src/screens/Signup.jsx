import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (newUser) => {
      const response = await axiosInstance.post("/user/register", newUser);
      return response.data;
    },
    onSuccess: (data) => {
      alert("Signup successful!", data);
      navigate("/signin");
    },
    onError: (error) => {
      console.error("Signup failed", error);
      alert("Signup failed, please try again.");
    },
  });

  // Form submit handler
  const handleSignup = (e) => {
    e.preventDefault();

    mutation.mutate({ email, password });
  };

  return (
    <div>
      <div
        className={`w-full h-full flex p-3 justify-center items-center fixed inset-0 transition-all duration-500`}
      >
        <div className="max-w-80 rounded-md p-3 w-full bg-white z-10">
          <h1 className="font-[500] text-lg">Register</h1>

          <form
            onSubmit={handleSignup}
            className="mt-4 flex flex-col space-y-2"
          >
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-xs font-[500] text-[#606060]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 text-xs border rounded-md placeholder:text-[10px]"
                placeholder="ex:john@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="password"
                className="text-xs text-[#606060] font-[500]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full text-xs p-2 border rounded-md"
                placeholder="ex:abcd@1234"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="w-full pt-5">
              <button
                type="submit"
                className="w-full p-2 bg-[#015FE4] text-white text-center rounded-md"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            {mutation.isError && (
              <p className="text-xs text-red-500 text-center">
                Error signing up.
              </p>
            )}

            <p className="text-xs text-[#9CA3AF] text-center">
              Already have an account?{" "}
              <Link className="cursor-pointer text-[#015FE4]" to={"/signin"}>
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
