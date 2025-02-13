import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/Redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const Loading = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      if (res.data.success) {
        const user = res.data.user;
        dispatch(setUser(user));
  
        // Redirect based on user role
        if (user.role === "Director") {
          navigate("/admin"); // Change this to your actual CD-Home route
        } else {
          navigate("/");
        }
  
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };
  

  return (
    <div className="bg-main-bg min-h-screen flex flex-col ">
      <div className="bg-overlay-bg  min-h-screen">
        <div className="mt-10">

        <Navbar />
        <div className="flex items-center justify-center max-w-7xl mx-auto mt-20 text-white">
          <form
            onSubmit={submitHandler}
            className="w-1/2 border border-gray-200 rounded-md p-4 "
          >
            <h1 className="font-bold text-xl mb-5 ">Login</h1>

            <div className="my-2 ">
              <Label>Email</Label>
              <Input
                type="email"
                value={Input.fullemail}
                name="email"
                onChange={changeEventHandler}
                placeholder=""
              />
            </div>

            <div className="my-2 ">
              <Label>Password</Label>
              <Input
                type="password"
                value={Input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder=""
              />
            </div>

            <div className="flex items-center justify-between ">
              <RadioGroup className="flex items-center gap-5 my-5">
                <div className="flex items-center space-x-2 ">
                  <Input
                    type="radio"
                    name="role"
                    value="Actor"
                    checked={input.role === "Actor"}
                    onChange={changeEventHandler}
                    className="cursor-pointer "
                  />
                  <Label htmlFor="r1">Actor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="Director"
                    checked={input.role === "Director"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Director</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex justify-center">

            {Loading.loading ? (
              <Button className="w-full my-4 ">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 bg-transparent transition duration-300 ease-in-out transform hover:bg-white hover:scale-105 hover:shadow-lg hover:text-black">
                Login
              </Button>
            )}
            </div>
            <span className="text-sm flex">
              Don't have account?{" "}
              <Link to="/SignUp" className="text-blue-600">
                SignUp
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
        </div>
  );
};

export default Login;
