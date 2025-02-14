import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Trash } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    // const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const { allAdminJobs, searchJobByCompany, searchJobByTitle } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    const handleDelete = async (jobId) => {
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
                withCredentials: true
            })
            if (res.data.success) {
                toast.success("Job deleted successfully");
                setFilterJobs(prev => prev.filter(job => job._id !== jobId));
            }
        } catch {
            toast.error(error.response?.data?.message || "Delete failed");
        }
    }

    useEffect(() => {
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job) => {
            // if(!searchJobByText){
            //     return true;
            // };
            // return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
            const matchesCompany =
                !searchJobByCompany || job?.company?.name.toLowerCase().includes(searchJobByCompany.toLowerCase());
            const matchesTitle =
                !searchJobByTitle || job?.title.toLowerCase().includes(searchJobByTitle.toLowerCase());
            return matchesCompany && matchesTitle;
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByCompany, searchJobByTitle])
    return (
        <div className='px-4'>
            <Table>
                <TableCaption className="py-3">A list of your recent  posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/jobs/create/${job._id}`)} className='flex items-center gap-2 w-fit mt-2 cursor-pointer hover:bg-gray-100'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2 hover:bg-gray-100'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                            <div onClick={() => handleDelete(job._id)} className='flex items-center gap-2 w-fit cursor-pointer hover:bg-gray-100 p-2 rounded text-red-600'>
                                                <Trash className='w-4' />
                                                <span>Delete</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable