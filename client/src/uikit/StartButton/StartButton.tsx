import React from 'react';
import { Link } from 'react-router-dom';
import style from './StartButton.module.css';

interface UIStartButtonProps {
  link: string;
  text: string;
}

const StartButton = ({ link, text }: UIStartButtonProps) => {
  return (
    <Link to={link}>
      <button className={style.btn}>{text}</button>
    </Link>
  );
};

export default React.memo(StartButton);
