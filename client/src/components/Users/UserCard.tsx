import { IUsersValues } from '@/interfaces';
import React from 'react';
import style from './Users.module.css';

interface IUserCardProps {
  item: IUsersValues;
  calculateAge: (birthDate: string) => number;
}

const UserCard = ({ item, calculateAge }: IUserCardProps) => {
  return (
    <>
      <img src={item.avatarUrl} alt="ava" className={style.img} />
      <div className={style.text}>{item.fullName}</div>
      <div className={style.text}>{calculateAge(item.birthDate)} years</div>
    </>
  );
};

export default React.memo(UserCard);
