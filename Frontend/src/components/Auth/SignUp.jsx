import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/util/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/Redux/authSlice";
import { Loader2, Store } from "lucide-react";

const SignUp = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const Loading = useSelector((Store) => Store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const fromData = new FormData();
    fromData.append("fullname", input.fullname);
    fromData.append("email", input.email);
    fromData.append("phoneNumber", input.phoneNumber);
    fromData.append("password", input.password);
    fromData.append("role", input.role);
    if (input.file) {
      fromData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, fromData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-main-bg min-h-screen flex flex-col">
      <div className="bg-overlay-bg  min-h-screen">
        <div className="mt-10">
          <Navbar />
          <div className="flex  items-center justify-center max-w-7xl mx-auto mt-10 text-white">
            <form
              onSubmit={submitHandler}
              className="w-1/2 border border-gray-200 rounded-md p-4 my-10 "
            >
              <h1 className="font-bold text-xl  mb-5">SignUp</h1>
              <div className="my-2 ">
                <Label>Full Name</Label>
                <Input
                  className="rounded"
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder=""
                />
              </div>
              <div className="my-2 ">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder=""
                />
              </div>
              <div className="my-2">
                <Label>Contact No</Label>
                <Input
                  type="text"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder=""
                />
              </div>
              <div className="my-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder=""
                />
              </div>

              <div className="flex items-center justify-between">
                <RadioGroup className="flex items-center gap-4 my-5">
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
                <div className="flex items-center gap-2">
                  {/* profile */}
                  <Label>Profile</Label>
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={changeFileHandler}
                    className="cursor-pointer text-white file:bg-white file:text-black file:px-4 file:rounded"
                  />
                </div>
              </div>
              {Loading.loading ? (
                <Button className="w-full my-4">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4 bg-transparent  transition duration-300 ease-in-out transform hover:bg-white hover:scale-105 hover:shadow-lg hover:text-black" >
                  SignUp
                </Button>
              )}

              <span className="text-sm">
                Already have account?{" "}
                <Link to="/login" className="text-blue-600">
                  Login
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
