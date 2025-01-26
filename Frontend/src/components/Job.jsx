import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";



const Job = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className='text-sm text-gray-500'>2 Days ago</p>
        <Button variant="outline" className="rounded-full bg-black" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
 
      <div>
        <h1 className='font-bold text-lg my-2'>Title </h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit doloremque dolor cumque hic aperiam unde rem numquam inventore dolore officia!</p>
      </div>
    <div className='flex items-center gap-2 mt-4 '>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">apply</Badge> 
        <Badge className={'text-blue-700 font-bold'} variant="ghost">apply</Badge> 
        <Badge className={'text-blue-700 font-bold'} variant="ghost">apply</Badge> 
        </div>
        <div className='flex items-center gap-4 mt-4'>
            <Button variant="outline" className="bg-black"> Details</Button>
            <Button variant="outline" className="bg-black">Save For Later</Button>
        </div>
    </div>
  );
};

export default Job;
