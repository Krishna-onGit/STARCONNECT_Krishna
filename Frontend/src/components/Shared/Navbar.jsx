import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOutIcon, User2 } from "lucide-react";
import { Link } from "react-router-dom";
// disappare of login and signup button after its process is left other then this most of stuff is done
const Navbar = () => {
  const user = false;
  return (
    <div className=" top-10 left-0 w-full z-20 ">
      <div className="flex  items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <Link to="/">
            <h1 className="font-bold text-2xl text-white">
              Star<span className="text-[#895bff]">Connect</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex gap-3 items-center  text-white font-bold">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/Jobs">JOBS</Link>
            </li>
            <li>
              <Link to="/News">NEWS</Link>
            </li>
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
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium "> Krishna </h4>
                    <p className="text-sm text-muted-foreground">
                      TYBSC-IT web developer
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">View profile</Button>
                  </div>

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOutIcon />
                    <Button variant="link">Logout</Button>
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
