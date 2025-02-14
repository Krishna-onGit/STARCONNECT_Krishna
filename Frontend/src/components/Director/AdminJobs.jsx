import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByTitle,setSearchJobByCompany} from '@/Redux/JobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [companyInput, setCompanyInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  // const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setSearchJobByText(input));
  // }, [input]);
  useEffect(() => {//added
    dispatch(setSearchJobByCompany(companyInput));
  }, [companyInput]);

  useEffect(() => {//added
    dispatch(setSearchJobByTitle(titleInput));
  }, [titleInput]);

  return (
    <div className='bg-main-bg min-h-screen'>
      <div className='bg-overlay-bg min-h-screen'>

      <Navbar />
      <div className='max-w-6xl mx-auto my-10 rounded bg-white px-10 py-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by Name"
            //onChange={(e) => setInput(e.target.value)}
            onChange={(e) => setCompanyInput(e.target.value)}//added
          />
          <Input
            className="w-fit"
            placeholder="Filter by Movie"
            // onChange={(e) => setInput(e.target.value)}
            onChange={(e) => setTitleInput(e.target.value)}//added
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
      </div>
  )
}

export default AdminJobs