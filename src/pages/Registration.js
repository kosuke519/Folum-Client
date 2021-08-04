import React from 'react';
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
function Registration() {
  const initialValues = {
    username: '',
    password: '',
  };

  let history = useHistory('');
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, '3文字以上で入力してください')
      .max(15)
      .required('ユーザー名を入力してください'),
    password: Yup.string()
      .min(8, '8文字以上で入力してください')
      .max(15, '15文字以下で入力してください')
      .required('パスワードを入力してください'),
  });

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/auth', data).then(() => {
      console.log(data);
    });
  };
  return (
    <div className="formContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formic">
          <label>ユーザーネーム</label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="ユーザーネームを入力してください"
          />
          <label>パスワード</label>
          <ErrorMessage name="password" component="span" />
          <Field
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="パスワードを入力してください"
          />
          <button type="submit">登録する</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
