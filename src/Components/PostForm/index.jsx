import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { SetPost } from '../../lib/redux/Slice/SetPostSlice';
import { UpdatePost } from '../../lib/redux/Slice/UpdatePostSlice';
import { setPostLocally, updatePostLocally } from '../../lib/redux/Slice/GetAllPostSlice';
import { generateRandomFloor } from '../../lib/helper';

const id_number = generateRandomFloor();
const maxlength = 200;

const PostForm = ({ postId, postTitle, postBody, userId, onSuccess }) => {
  const dispatch = useDispatch();
  const [charCount, setCharCount] = useState(postBody ? postBody.length : 0);

  const updateValues = {
    userId: userId,
    title: postTitle,
    body: postBody,
  };

  const initialValues = {
    id: id_number,
    userId: '',
    title: '',
    body: '',
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required('User ID is required'),
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

  const handleTextareaChange = (event, setFieldValue) => {
    const { value } = event.target;
    setCharCount(value.length);
    setFieldValue('body', value);
  };

  return (
    <Formik
      initialValues={postId ? updateValues : initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="space-y-4 p-4 bg-gray-800 rounded-lg shadow-md">
          <div className="flex flex-col">
            <label htmlFor="userId" className="text-white font-semibold mb-2 flex justify-start">User ID</label>
            <Field
              type="number"
              id="userId"
              name="userId"
              placeholder="Write userId  . . ."
              className="p-2 border rounded-md border-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <ErrorMessage name="userId" component="div" className="text-red-500 mt-1 text-xs flex justify-start font-medium" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-white font-semibold mb-2 flex justify-start">Title</label>
            <Field
              type="text"
              id="title"
              name="title"
              maxLength={55}
              placeholder="Write Post Title . . ."
              className="p-2 border rounded-md border-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 mt-1 text-xs flex justify-start font-medium" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="body" className="text-white font-semibold mb-2 flex justify-start">Description</label>
            <Field
              as="textarea"
              id="body"
              name="body"
              rows="4"
              onChange={(event) => handleTextareaChange(event, setFieldValue)}
              className="p-2 border rounded-md border-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Write Post Description . . ."
            />
            <div className="grid grid-cols-2">
              <span>

              <ErrorMessage name="body" component="div" className="text-red-500 mt-1 text-xs flex justify-start font-medium" />
              </span>
              <div className="text-right text-xs text-gray-600 dark:text-gray-400 mt-1 flex justify-end">
                {charCount}/{maxlength}
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {postId ? "Update Post" : "Create Post"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
