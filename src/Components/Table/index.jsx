import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllPost } from '../../lib/redux/Slice/GetAllPostSlice';
import CustomPopover from '../Commons/CustomPopover';
import Error from '../Commons/Error';
import PostForm from '../PostForm';
import { FaPlus } from 'react-icons/fa6';
import TableRow from './TableRow';

function Table() {
    
    const [isFormPopoverOpen, setFormPopoverOpen] = useState(false);

    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.getAllPost);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(GetAllPost());
        }
    }, [dispatch, status]);

        // Toggle function for the popover
        const handleFormPopoverToggle = () => {
            setFormPopoverOpen(prev => !prev);
        };
    
        // Handle success callback from PostForm
        const handleFormSuccess = () => {
            setFormPopoverOpen(false); // Close the popover on form success
            dispatch(GetAllPost()); // Optionally reload posts
        };


    return (
        <table className='bg-slate-600 w-full'>
            <thead>
                <tr className='grid grid-cols-10 justify-items-start p-2 text-yellow-500'>
                    <th className='flex gap-4'>
                       <span>Author
                        </span>
                       <span>#id
                        </span>
                         </th>
                    <th className='col-span-2'>Title</th>
                    <th className='text-ellipsis overflow-hidden col-span-5'>Description</th>
                    <th className='col-span-2 w-full flex justify-end items-center gap-10'>Actions
                        <CustomPopover
                            popOverTrigger={
                                <span className='addbtn flex justify-center items-center h-6 w-6 rounded-lg bg-yellow-500 text-lg cursor-pointer hover:bg-slate-500 hover:text-white group/icon text-black'>
                                    <FaPlus />
                                </span>}
                            popOverContent={<div className='min-h-[200px]'>
                                <PostForm onSuccess={handleFormPopoverToggle} />
                            </div>}
                            popoverTitle={<span className='flex justify-start capitalize'>{"Create New Post"}</span>}
                            isPopoverOpen={isFormPopoverOpen}
                            handlePopoverToggle={handleFormPopoverToggle}
                            closeArrow={true}
                        />
                    </th>
                </tr>
            </thead>
            <tbody>

                {(status === 'loading')?(<tr className='text-xl text-blue-600 flex justify-center items-center'>Loading . . .</tr>):
                (status === 'failed')?(<tr><Error className="flex justify-center items-center w-full">{error}</Error></tr>)
                :(status === 'succeeded' && data.length > 0 ? (
                    data.map((post) => (
                        <>
                            <TableRow key={post.id} post={post} />
                        </>
                    ))
                ) :      <tr>
                <td colSpan="10" className="text-center text-white py-4">
                    No posts available.
                </td>
            </tr>)}
              
            </tbody>
        </table>
    );
}

export default Table;
