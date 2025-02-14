import React, { useState } from 'react';
import { Search, ChevronDown, Star, MessageCircle, Send } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import pho from "/Images/sahelon.jpg";
import pho1 from "/Images/wall1.jpg";
import pho2 from "/Images/wall2.jpg";
import Navbar from '../shared/Navbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const FindTalent = () => {

  const filters = [
    { name: 'Gender', options: ['Select All','Male', 'Female', 'Non-Binary'] },
    { name: 'Age', options: ['Select All','18-25', '26-35', '36-45', '45+'] },
    { name: 'Hair Color', options: ['Select All','Black', 'Brown', 'Blonde', 'Red'] },
    { name: 'Eye Color', options: ['Select All','Brown', 'Blue', 'Green', 'Hazel'] },
    { name: 'Locaiton', options: ['Select All','mumbai', 'pune', 'nashik', 'indore'] },
    { name: 'body type', options: ['Select All','select All', 'avg', 'slim', 'curvy'] },
    { name: 'Skill ', options: ['Select All','Brown', 'Blue', 'Green', 'Hazel'] }
  ];

  const talents = [
    {
      id: 1,
      name: 'Scout Lyons',
      location: 'Providence, RI',
      image: pho,
      rating: 4.5
    },
    {
      id: 2,
      name: 'Philip Green',
      location: 'Middle Island, NY',
      image: pho1,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Bethany Coyle',
      location: 'Los Angeles, CA',
      image: pho2,
      rating: 4.7
    }
  ];

  const [selectedfilter,setselectedfilter]=useState({});
  const handleFilterChange=(filterName,option)=>{
    setselectedfilter((prev)=>{
      const currentSelection = prev[filterName] || [];
      let newSelection;
      if(option=="Select All") {
        newSelection=currentSelection.includes('Select All') ? [] : filters.find(f => f.name === filterName).options.slice(1);
      }
      else {
        newSelection = currentSelection.includes(option)
          ? currentSelection.filter(item => item !== option)
          : [...currentSelection, option];
      }
      return { ...prev, [filterName]: newSelection };
    });
  };

  return (<>
  <div className='bg-main-bg'>

    <Navbar />
    <div className="max-w-7xl mx-auto p-3">
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filter Results</h2>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center space-x-2 bg-black text-white px-3 py-1.5 rounded-full">
            <span>Actors & Performers</span>
          </div>
        </div>

        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search Actor by Name..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-4">
          {filters.map((filter) => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {filter.name} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {filter.options.map((option, idx) => (
                  <DropdownMenuItem key={idx}>{option}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>




        {/* Height Text Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 ">Height in cm</label>
          <Input type="number" placeholder="Enter height..." className="mt-1 w-1/6" min="50" />
        </div>

        {/* Weight Range Slider */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Weight in kg</label>
          <Slider defaultValue={[50]} max={150} step={1} className="mt-1 w-1/4" />
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Badge variant="secondary">
            Showing 1-48 of 762,187 candidates
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort By:</span>
          <Button variant="outline" className="flex items-center gap-2">
            Recommended
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Talent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {talents.map((talent) => (
          <div key={talent.id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer duration-300 hover:scale-105 hover:-translate-y-1" >
            <div className="relative">
              <img
                src={talent.image}
                alt={talent.name}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm">{talent.rating}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{talent.name}</h3>
              <p className="text-gray-600 text-sm">{talent.location}</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  </>
  );
};

export default FindTalent;