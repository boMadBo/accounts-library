import React from 'react';
import style from './SendButtom.module.css';

interface UISendButtonProps {
  text: string;
  disabled: boolean;
}

const SendButtom = ({ text, disabled }: UISendButtonProps) => {
  return (
    <button type="submit" disabled={disabled} className={style.btn}>
      {text}
    </button>
  );
};

export default React.memo(SendButtom);
