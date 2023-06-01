import FormikTF from '@/components/helpers/FormikTF';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ILoginValues } from '@/interfaces';
import { fetchLogin } from '@/rdx/reducers/loginSlice';
import UISendButtom from '@/uikit/SendButtom/SendButtom';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import style from './Login.module.css';
import { initialValues, validationSchema } from './helpers';

const Login = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const isAuth = useAppSelector((state) => state.loginSlice.isAuth);
  const dispatch = useAppDispatch();

  const handleChange = useCallback((values: ILoginValues) => {
    dispatch(fetchLogin(values));
  }, []);

  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setRememberMe(checked);
    Cookies.set('rememberMe', checked.toString(), { expires: 365 });
  };

  if (isAuth) {
    return <Navigate to={'/users'} />;
  }

  return (
    <section className={style.login}>
      <Formik initialValues={initialValues} validateOnBlur validationSchema={validationSchema} onSubmit={handleChange}>
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className={style.container}>
            <FormikTF name="email" type="email" label="Your email" />
            <FormikTF name="password" type="password" label="Your password" />
            <div className={style.checkbox}>
              <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
              <label htmlFor="">Remember me</label>
            </div>
            <UISendButtom text="Submit" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default React.memo(Login);
