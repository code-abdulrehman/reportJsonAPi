import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { SetPost } from '../../lib/redux/Slice/SetPostSlice';
import { UpdatePost } from '../../lib/redux/Slice/UpdatePostSlice';
import { setPostLocally, updatePostLocally } from '../../lib/redux/Slice/GetAllPostSlice';

const PostForm = ({ postId, postTitle, postBody, userId, onSuccess }) => {
  const dispatch = useDispatch();

  const updateValues = {
    userId: userId,
    title: postTitle,
    body:  postBody,
  };
  const initialValues = {
    id: 100+3,
    userId: '',
    title: '',
    body: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required'),
  });
  const handleSubmit = (values, { resetForm }) => {
    if (postId) {
     dispatch(UpdatePost({ id: postId, updatePost: values }));
      dispatch(updatePostLocally({ id: postId, ...values }));
    } else {
     dispatch(SetPost(values));
      dispatch(setPostLocally(values));
    }
    resetForm();
    if (onSuccess) {
      onSuccess(); // Close the popover on success
    }
  };


  return (
    <Formik
      initialValues={postId ? updateValues : initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 p-4 bg-gray-800 rounded-lg shadow-md">
          <div className="flex flex-col">
            <label htmlFor="userId" className="text-white font-semibold mb-2 flex justify-start">userId</label>
            <Field
              type="number"
              id="userId"
              name="userId"
              className="p-2 border rounded-md border-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="userId" component="div" className="text-red-500 mt-1" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-white font-semibold mb-2 flex justify-start">Title</label>
            <Field
              type="text"
              id="title"
              name="title"
              className="p-2 border rounded-md border-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 mt-1" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="body" className="text-white font-semibold mb-2 flex justify-start">Body</label>
            <Field
              as="textarea"
              id="body"
              name="body"
              rows="4"
              className="p-2 border rounded-md border-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="body" component="div" className="text-red-500 mt-1" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {postId ? "Update Post" : "Create Post"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
