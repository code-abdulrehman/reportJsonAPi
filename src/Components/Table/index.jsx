import React, { useEffect } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { BsTrash3Fill } from 'react-icons/bs';
import { FaPen, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllPost } from '../../lib/redux/Slice/GetAllPostSlice';
import { DeletePost } from '../../lib/redux/Slice/DeletePostSlice';
import CustomPopover from '../Commons/CustomPopover';
import SinglePost from '../SinglePost';
import Error from '../Commons/Error';
import PostForm from '../PostForm';

function Table() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.getAllPost);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(GetAllPost());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div className='text-xl text-blue-600 flex justify-center items-center'>Loading . . .</div>;
  }

  if (status === 'failed') {
    return <Error className="flex justify-center items-center w-full">{error}</Error>;
  }

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(DeletePost(postId));
    }
  };

  return (
    <table className='bg-slate-600 w-full'>
      <thead>
        <tr className='grid grid-cols-10 justify-items-start p-2 text-yellow-500'>
          <th>#userId</th>
          <th>#id</th>
          <th className='col-span-2'>Title</th>
          <th className='text-ellipsis overflow-hidden col-span-5'>Description</th>
          <th className='col-span-1 flex justify-between items-center gap-10'>Actions
                            <CustomPopover
                  popOverTrigger={         
                      <span className='addBtn text-blue-600 font-bold hover:bg-slate-500 h-6 w-6 rounded-md flex justify-center items-center cursor-pointer hover:text-white'>
                  <FaPlus />
                </span>}
                  popOverContent={<div className='min-h-[200px]'>
                    <PostForm />
                  </div>}
                  popoverTitle={<span className='flex justify-start capitalize'>{"Create New Post"}</span>}
                  closeArrow={true}
                />
          </th>
        </tr>
      </thead>
      <tbody>
        {status === 'succeeded' && data.length > 0 ? (
          data.map((post) => (
            <tr key={post.id} className='tds grid grid-cols-11 p-2 justify-items-start'>
              <td><b>#</b>{post.userId || 'userId'}</td>
              <td><b>#</b>{post.id || 'postId'}</td>
              <td className='col-span-2 line-clamp-1 capitalize text-ellipsis overflow-hidden'>
                {post.title || 'title'}
              </td>
              <td className='capitalize line-clamp-1 text-ellipsis overflow-hidden col-span-5'>
                {post.body || 'Description: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius, rerum!'}
              </td>
              <td className='flex ml-6 gap-2 items-center  justify-end'>
                <span className='deleteBtn text-red-600 font-bold hover:bg-slate-500 h-6 w-6 rounded-md flex justify-center items-center cursor-pointer hover:text-white' onClick={()=>handleDelete(post.id)}>
                  <BsTrash3Fill />
                </span>
                <CustomPopover
                  popOverTrigger={ <span className='deleteBtn text-blue-600 font-bold hover:bg-slate-500 h-6 w-6 rounded-md flex justify-center items-center cursor-pointer hover:text-white'>
                  <FaPen />
                </span>}
                  popOverContent={<div className='min-h-[200px]'>
                    <PostForm postId={post.id} />
                  </div>}
                  popoverTitle={<span className='capitalize'>{"Update Post"}</span>}
                  closeArrow={true}
                />

              </td>
                        <CustomPopover
                  popOverTrigger={<span className='open flex justify-center items-center h-6 w-6 rounded-lg bg-yellow-500 text-lg cursor-pointer hover:bg-slate-500 hover:text-white group/icon text-black'>
                    <BiChevronRight className='group-hover/icon:font-bold' />
                  </span>}
                  popOverContent={<div className='min-h-[200px]'>
                    <SinglePost postId={post.id} />
                  </div>}
                  popoverTitle={<span className='capitalize'>{post.title || "Title"}</span>}
                  closeArrow={true}
                />
            </tr>
          ))
        ) : null}
      </tbody>
    </table>
  );
}

export default Table;
