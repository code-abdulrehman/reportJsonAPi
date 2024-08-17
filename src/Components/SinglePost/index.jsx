import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetPost } from '../../lib/redux/Slice/GetPostSlice';
import Error from '../Commons/Error';

function SinglePost({ postId }) {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.getPost);

  useEffect(() => {
      if (status === 'idle') {
          dispatch(GetPost(postId));
      }
  }, [dispatch, status,postId]);

  return (
    <div className='text-white p-4'>
            {status === 'loading' ? (
                    <div className='text-xl text-blue-600 flex justify-center items-center'>Loading . . .</div>
                ) : status === 'failed' ? (
                  <Error className="flex justify-center items-center w-full">
                  {error}
                                      </Error>
                ) : (
                    status === 'succeeded' &&
                    data && <>    <div className="flex justify-between items-center">

                    <div className="postId">
                      <span className="text-blue-400"><b>#</b>PostId: &nbsp;</span>{data?.id || "0"}
                      </div>
                      </div>
                
                      <div className="pre">
                      
                        {data?.body || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus labore adipisci veritatis recusandae voluptatibus nihil obcaecati nulla consequuntur distinctio vero? Laborum numquam fugit tempora voluptatibus ex ratione mollitia architecto porro."}
                      </div>
                      <br />
                      <div className="author flex justify-end">
                    <span className="text-gray-400 font-mono font font-medium text-xs mr-1 flex items-end gap-2">Author <b className='text-gray-300'>@{data?.userId || "0"}
                      </b></span> 
                      <img src={`https://robohash.org/user${data.userId+data.id}.png`} className='h-12 w-12 rounded-full bg-yellow-500 overflow-hidden' alt="" />
                      </div>
            
                      </>)}

  
    </div>
  )
}

export default SinglePost