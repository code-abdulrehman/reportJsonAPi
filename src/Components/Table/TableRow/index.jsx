import React, { useState } from 'react';
import PostForm from '../../PostForm';
import CustomPopover from '../../Commons/CustomPopover';
import { FaPen } from 'react-icons/fa';
import { BsTrash3Fill } from 'react-icons/bs';
import { BiChevronRight } from 'react-icons/bi';
import SinglePost from '../../SinglePost';
import { useDispatch } from 'react-redux';
import { DeletePost } from '../../../lib/redux/Slice/DeletePostSlice';
import { removePostLocally } from '../../../lib/redux/Slice/GetAllPostSlice';

function TableRow({ post }) {
    const [isEditPopoverOpen, setIsEditPopoverOpen] = useState(false);
    const [isSinglePostPopoverOpen, setIsSinglePostPopoverOpen] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            dispatch(DeletePost(postId));
            dispatch(removePostLocally(postId));
        }
    };

    const handleEditPopoverToggle = () => {
        setIsEditPopoverOpen(!isEditPopoverOpen);
    };

    const handleSinglePostPopoverToggle = () => {
        setIsSinglePostPopoverOpen(!isSinglePostPopoverOpen);
    };

    const handleFormSuccess = () => {
        handleEditPopoverToggle(); // Close the popover on successful form submission
    };

    return (
        <>
            <tr className='tds grid grid-cols-11 p-2 justify-items-start gap-6 hover:border border-yellow-500'>
                <td className='flex gap-8'>
                    <span>
                        <b>#</b>{post.userId || 'userId'}
                    </span>
                    <span>
                        <b>#</b>{post.id || 'postId'}
                    </span>
                </td>
                <td className='col-span-2 line-clamp-1 capitalize text-ellipsis overflow-hidden'>
                    {post.title || 'title'}
                </td>
                <td className='capitalize line-clamp-1 text-ellipsis overflow-hidden col-span-6'>
                    {post.body || 'Description: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius, rerum!'}
                </td>
                <td></td>
                <td className='flex gap-2 items-center'>
                    <span className='deleteBtn text-red-600 font-bold hover:bg-slate-500 h-6 w-6 rounded-md flex justify-center items-center cursor-pointer hover:text-white' onClick={() => handleDelete(post.id)}>
                        <BsTrash3Fill />
                    </span>
                    <CustomPopover
                        popOverTrigger={<span className='editbtn text-blue-600 font-bold hover:bg-slate-500 h-6 w-6 rounded-md flex justify-center items-center cursor-pointer hover:text-white'>
                            <FaPen />
                        </span>}
                        popOverContent={<div className='min-h-[200px]'>
                            <PostForm postId={post.id} postTitle={post.title} postBody={post.body} userId={post.userId} onSuccess={handleFormSuccess} />
                        </div>}
                        popoverTitle={<span className='capitalize'>{"Update Post"}</span>}
                        isPopoverOpen={isEditPopoverOpen}
                        handlePopoverToggle={handleEditPopoverToggle}
                        closeArrow={true}
                    />

                    <CustomPopover
                        popOverTrigger={<span className='open flex justify-center items-center h-6 w-6 rounded-lg bg-yellow-500 text-lg cursor-pointer hover:bg-slate-500 hover:text-white group/icon text-black'>
                            <BiChevronRight className='group-hover/icon:font-bold' />
                        </span>}
                        popOverContent={<div className='min-h-[200px]'>
                            <SinglePost postId={post.id} />
                        </div>}
                        popoverTitle={<span className='capitalize'>{post.title || "Title"}</span>}
                        isPopoverOpen={isSinglePostPopoverOpen}
                        handlePopoverToggle={handleSinglePostPopoverToggle}
                        closeArrow={true}
                    />
                </td>
            </tr>
        </>
    );
}

export default TableRow;
