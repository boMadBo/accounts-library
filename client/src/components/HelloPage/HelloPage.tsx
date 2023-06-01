import { useAppSelector } from '@/hooks';
import StartButton from '@/uikit/StartButton';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import style from './HelloPage.module.css';

const HelloPage = () => {
  const isAuth = useAppSelector((state) => state.loginSlice.isAuth);

  if (isAuth) {
    return <Navigate to={'/users'} />;
  }

  return (
    <section className={style.hello_wrapper}>
      <div className={style.hello}>
        <h1>Welcome to Account Library!</h1>
        <div className={style.btn_group}>
          <StartButton link="/register" text="Register" />
          <StartButton link="/login" text="I have account" />
        </div>
        <Outlet />
      </div>
    </section>
  );
};

export default React.memo(HelloPage);
