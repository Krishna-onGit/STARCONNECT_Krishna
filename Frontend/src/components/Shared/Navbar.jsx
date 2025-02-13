import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { setUser } from "@/Redux/authSlice";

// disappare of login and signup button after its process is left other then this most of stuff is done
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profilePath =
    user?.role === "Director"
      ? `/admin/CDprofile/${user._id}` // Director Profile
      : "/profile"; // Actor Profile
   
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    };
  
  };
  return (
    <div className="pt-5 w-full z-20 bg-transparent ">
      <div className="flex  items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div className="flex items-center gap-2 ">
        <Link to={user?.role === "Director" ? "/admin" : "/"}>
        <img
            src={"/Images/STARCONNECT.svg"}
            alt="StarConnect Logo"
            className="size-4/12"
          />
            {/* <h1 className="font-bold text-2xl text-white">
              Star<span className="text-[#895bff]">Connect</span>
            </h1> */}
          </Link>
        </div>
        <div className="flex items-center  gap-10">
          <ul className="flex gap-3 items-center  text-white font-bold">
          {
              user && user.role === 'Director' ? (
                <>
                   <li><Link to="/admin">HOME</Link></li>
                  <li><Link to="/admin/Companies">COMPANIES</Link></li>
                  <li><Link to="/admin/jobs">JOBS</Link></li>
                 
                </>
              ) : (
                <>
                  <li><Link to="/">HOME</Link></li>
                  <li><Link to="/JOBS">JOBS</Link></li>
                  <li><Link to="/NEWS">NEWS</Link></li>
                </>
              )
            }
         
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to={"/Login"}>
                <Button varient="outline" className="text-white rounded">
                  Login
                </Button>
              </Link>
              <Link to={"/SignUp"}>
                <Button className=" text-white rounded">SignUp</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                     
                      src={user?.profile?.profilePhoto}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium "> {user?.fullname} </h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      <Link to={profilePath}>View profile</Link>
                    </Button>
                  </div>

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
