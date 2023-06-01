import React from 'react';
import { Link } from 'react-router-dom';
import style from './HeaderButton.module.css';

interface UIStartButtonProps {
  link: string;
  text: string;
  click: (() => void) | (() => any);
}

const HeaderButton = ({ link, text, click }: UIStartButtonProps) => {
  return (
    <Link to={link}>
      <button className={style.btn} onClick={click}>
        {text}
      </button>
    </Link>
  );
};

export default React.memo(HeaderButton);
