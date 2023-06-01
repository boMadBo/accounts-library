import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchAccount } from '@/rdx/reducers/accountSlice';
import { fetchUsers } from '@/rdx/reducers/usersSlice';
import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import UserCard from './UserCard';
import style from './Users.module.css';

const Users = () => {
  const users = useAppSelector((state) => state.usersSlice.users);
  const me = useAppSelector((state) => state.accountSlice.me);
  const isAuth = useAppSelector((state) => state.loginSlice.isAuth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAccount());
  }, []);

  const filteredUsers = useMemo(() => users.filter((item) => item._id !== me._id), [users, me]);

  const calculateAge = useMemo(
    () => (birthDate: string) => {
      const currentDate = dayjs();
      const birth = dayjs(birthDate);
      const age = currentDate.diff(birth, 'year');
      return age;
    },
    [],
  );

  if (!isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <section className={style.users}>
      {users && (
        <div className={style.container}>
          <div className={style.wrap}>
            {filteredUsers.map((item) => (
              <div key={item._id} className={style.card}>
                <UserCard item={item} calculateAge={calculateAge} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default React.memo(Users);
