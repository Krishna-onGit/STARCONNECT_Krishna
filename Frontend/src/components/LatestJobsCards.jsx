import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'


const LatestJobsCards = () => {
  const navigate = useNavigate();
  return (
    <div className='p-5 rounded-md  bg-white border shadow-white shadow-sm border-grey-500 cursor-pointer'>
        <div >
        <h1 className='font-medium text-lg'>Company Name </h1>
        <p className='text-sm text-gray-500'>India </p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>Job Title</h1>
            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='flex items-center gap-2 mt-4 '>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">apply</Badge> 
        <Badge className={'text-blue-700 font-bold'} variant="ghost">apply</Badge> 
        <Badge className={'text-blue-700 font-bold'} variant="ghost">apply</Badge> 
        </div>
    </div>
  )
}

export default LatestJobsCards