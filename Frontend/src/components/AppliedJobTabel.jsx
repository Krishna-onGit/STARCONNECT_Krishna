import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTabel = () => {
    const {allAppliedJobs}= useSelector(store=>store.job);
  return (
    <div className='px-4'>
         <Table className=" border border-gray-200 backdrop-blur-xl bg-white/45 rounded-2xl">
            <TableCaption className="py-3">A list of your recent applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {
                        allAppliedJobs.length <= 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4">You haven't applied to any jobs</td>
                            </tr>
                        ) : (
                            allAppliedJobs.map((appliedjob) => (
                                <TableRow key={appliedjob._id}>
                                    <TableCell>{appliedjob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{appliedjob?.title}</TableCell>
                                    <TableCell>{appliedjob?.company?.name}</TableCell>
                                    {/* 🔹 Applied dynamic background colors correctly */}
                                    <TableCell className="text-right">
                                        <Badge className={`${appliedjob?.status === "rejected" ? 'bg-red-400' : appliedjob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                            {appliedjob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTabel